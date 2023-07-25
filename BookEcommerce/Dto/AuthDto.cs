namespace BookStore.Dto;

public class LoginRequest
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public bool IsRemember { get; set; } = false;

}

public class RegisterRequest
{
    public string Password { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
}
public class RefreshTokenRequest
{
    public string RefreshToken { get; set; } = null!;
}

public class LoginResponse
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public DateTime AccessTokenExpiry { get; set; }
    public UserProfile User { get; set; } = null!;
}

public class UserProfile
{
    public string Id { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? AvatarUrl { get; set; }




}