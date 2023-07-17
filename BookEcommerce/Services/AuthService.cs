

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BookStore.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.Mail;
using Microsoft.IdentityModel.Tokens;

namespace BookStore.Services
{
    public class AuthService : IAuthService
    {


        private readonly BookStoreContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMailService _mailService;

        public AuthService(BookStoreContext context, ITokenService tokenService, IMailService mailService)
        {
            _context = context;
            _tokenService = tokenService;
            _mailService = mailService;
        }


        public async Task<LoginResponse?> Login(LoginRequest request, HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();
            var device = context.Request.Headers["User-Agent"].ToString();
            var deviceInfo = $"{device} - {ipAddress}";
            var user = await _context.Users
                .Include(u => u.Permissions).
                Include(u => u.Roles).ThenInclude(r => r.Permissions)
                .FirstOrDefaultAsync(u => u.Email == request.Username || u.Id.ToString() == request.Username || u.PhoneNumber == request.Username);
            if (user == null) return null;
            if (!user.Password.Equals(request.Password)) return null;
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.Email),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.GivenName, user.DisplayName),
                new("userId", user.Id.ToString()),
                new("displayName", user.DisplayName),
                new("email", user.Email),

            };
            int expireInMinutes = 60 * 24 * (request.IsRemember ? 15 : 1);
            var refreshToken = _tokenService.GenerateToken(claims, expireInMinutes);
            _context.Tokens.Add(new Token
            {
                TokenValue = refreshToken,
                DeviceInfo = deviceInfo,
                CreatedAt = DateTime.UtcNow,
                UserId = user.Id,
                User = user
            });
            await _context.SaveChangesAsync();
            claims.AddRange(user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Value)));
            claims.AddRange(user.Permissions.Select(p => new Claim("Permission", p.Value)));
            claims.AddRange(user.Roles.SelectMany(r => r.Permissions).Select(p => new Claim("Permission", p.Value)));
            var token = _tokenService.GenerateToken(claims, 5);

            return new LoginResponse
            {
                AccessToken = token,
                RefreshToken = refreshToken
            };
        }


        public async Task<LoginResponse?> Register(RegisterRequest request, HttpContext context)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user != null) return null;
            var newUser = new User
            {
                Email = request.Email,
                Password = request.Password,
                DisplayName = request.DisplayName,
                PhoneNumber = "",
                Roles = _context.Roles.Where(r => r.Value == "User").ToList(),

            };
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return await Login(new LoginRequest
            {
                Username = request.Email,
                Password = request.Password
            }, context);

        }
        public Task<bool> ValidateEmail(string token)
        {
            var errorMessages = _tokenService.TryDecodeToken(token, out var claimsPrincipal);

            if (!errorMessages.IsNullOrEmpty()) throw new BaseAppException(errorMessages, System.Net.HttpStatusCode.BadRequest);
            var userId = (claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.BadRequest);
            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.BadRequest);
            var email = (claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.BadRequest);
            if (user.Email != email) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.BadRequest);
            user.IsValidateEmail = true;
            _context.Users.Update(user);
            _context.SaveChanges();
            return Task.FromResult(true);
        }

        public Task<LoginResponse> RefreshToken(string refreshToken, HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();
            var device = context.Request.Headers["User-Agent"].ToString();
            var deviceInfo = $"{device} - {ipAddress}";
            var claimsPrincipal = _tokenService.DecodeToken(refreshToken) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var userId = (claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var token = _context.Tokens.FirstOrDefault(t => t.TokenValue == refreshToken && t.UserId.ToString() == userId && t.DeviceInfo == deviceInfo) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            if (token.IsRevoked) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);


            var user = _context.Users.Include(u => u.Permissions).
                Include(u => u.Roles).ThenInclude(r => r.Permissions).FirstOrDefault(u => u.Id.ToString() == userId) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.Email),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.GivenName, user.DisplayName),
                new("userId", user.Id.ToString()),
                new("displayName", user.DisplayName),
                new("email", user.Email),


            };
            claims.AddRange(user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Value)));
            claims.AddRange(user.Permissions.Select(p => new Claim("Permission", p.Value)));

            claims.AddRange(user.Roles.SelectMany(r => r.Permissions).Select(p => new Claim("Permission", p.Value)));
            var newToken = _tokenService.GenerateToken(claims, 5);
            return Task.FromResult(new LoginResponse()
            {
                AccessToken = newToken,
                RefreshToken = refreshToken
            });
        }
        public Task Logout(string refreshToken, HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();
            var device = context.Request.Headers["User-Agent"].ToString();
            var deviceInfo = $"{device} - {ipAddress}";
            var claimsPrincipal = _tokenService.DecodeToken(refreshToken) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var userId = (claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var token = _context.Tokens.FirstOrDefault(t => t.TokenValue == refreshToken && t.UserId.ToString() == userId && t.DeviceInfo == deviceInfo) ?? throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            if (token.IsRevoked) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);

            _context.Tokens.Remove(token);
            _context.SaveChanges();
            return Task.CompletedTask;
        }

        public async Task<bool> SendVerificationEmail(Guid userId, string currentDomain)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId) ?? throw new NotFoundException("User not found");
            if (user.IsValidateEmail) throw new BaseAppException("Email already verified", System.Net.HttpStatusCode.BadRequest);
            var email = user.Email;
            var token = _tokenService.GenerateToken(new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Email, email),
            }, 15);
            var url = $"{currentDomain}/Auth/validate-email?token={token}";
            var mailRequest = new MailRequest()
            {
                Body = $"Please click the link below to verify your email address <br> <a href='{url}'>Verify Email</a>",
                Subject = "Verify Email",
                ToEmail = email,
                Priority = MailPriority.High
            };
            var result = await _mailService.SendEmailAsync(mailRequest);
            return result;
        }
    }
}
