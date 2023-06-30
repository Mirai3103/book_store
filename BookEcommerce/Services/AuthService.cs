

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BookStore.Exceptions;
namespace BookStore.Services
{
    public class AuthService : IAuthService
    {


        private readonly BookStoreContext _context;
        private readonly ITokenService _tokenService;

        public AuthService(BookStoreContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
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

            var refreshToken = _tokenService.GenerateToken(claims, 60 * 24 * 7);
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
        public Task<string?> ValidateEmail(string token)
        {
            throw new NotImplementedException();
        }

        public Task<LoginResponse> RefreshToken(string refreshToken, HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();
            var device = context.Request.Headers["User-Agent"].ToString();
            var deviceInfo = $"{device} - {ipAddress}";
            var claimsPrincipal = _tokenService.DecodeToken(refreshToken);
            if (claimsPrincipal == null) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var userId = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var token = _context.Tokens.FirstOrDefault(t => t.TokenValue == refreshToken && t.UserId.ToString() == userId && t.DeviceInfo == deviceInfo);
            if (token == null) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            if (token.IsRevoked) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);


            var user = _context.Users.Include(u => u.Permissions).
                Include(u => u.Roles).ThenInclude(r => r.Permissions).FirstOrDefault(u => u.Id.ToString() == userId);
            if (user == null) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
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
            var claimsPrincipal = _tokenService.DecodeToken(refreshToken);
            if (claimsPrincipal == null) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var userId = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            var token = _context.Tokens.FirstOrDefault(t => t.TokenValue == refreshToken && t.UserId.ToString() == userId && t.DeviceInfo == deviceInfo);
            if (token == null) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);
            if (token.IsRevoked) throw new BaseAppException("Invalid token", System.Net.HttpStatusCode.Unauthorized);

            _context.Tokens.Remove(token);
            _context.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
