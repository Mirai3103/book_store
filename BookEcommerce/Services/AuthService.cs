

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        public async Task<LoginResponse?> Login(LoginRequest request)
        {
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
            };

            var refreshToken = _tokenService.GenerateToken(claims, 60 * 24 * 7);
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


        public async Task<LoginResponse?> Register(RegisterRequest request)
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
            });

        }
        public Task<string?> ValidateEmail(string token)
        {
            throw new NotImplementedException();
        }

        public Task<string> RefreshToken(string refreshToken)
        {
            var claimsPrincipal = _tokenService.DecodeToken(refreshToken);
            if (claimsPrincipal == null) throw new Exception("Invalid token");
            var userId = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var user = _context.Users.Include(u => u.Permissions).
                Include(u => u.Roles).ThenInclude(r => r.Permissions).FirstOrDefault(u => u.Id.ToString() == userId);
            if (user == null) throw new Exception("Invalid token");
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.Email),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.GivenName, user.DisplayName),
            };
            claims.AddRange(user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Value)));
            claims.AddRange(user.Permissions.Select(p => new Claim("Permission", p.Value)));

            claims.AddRange(user.Roles.SelectMany(r => r.Permissions).Select(p => new Claim("Permission", p.Value)));
            var newToken = _tokenService.GenerateToken(claims, 5);
            return Task.FromResult(newToken);
        }
    }
}
