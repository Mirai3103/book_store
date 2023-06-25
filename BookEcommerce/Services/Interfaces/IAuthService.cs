using BookStore.Dto;

namespace BookStore.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponse?> Login(LoginRequest request);
        Task<LoginResponse?> Register(RegisterRequest request);
        Task<string?> ValidateEmail(string token);
        Task<string> RefreshToken(string refreshToken);
    }
}