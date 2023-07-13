using BookStore.Dto;

namespace BookStore.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponse?> Login(LoginRequest request, HttpContext context);
        Task<LoginResponse?> Register(RegisterRequest request, HttpContext context);
        Task<bool> ValidateEmail(string token);
        Task<LoginResponse?> RefreshToken(string refreshToken, HttpContext context);
        Task Logout(string refreshToken, HttpContext context);
        Task<bool> SendVerificationEmail(Guid userId, string currentDomain);
    }
}