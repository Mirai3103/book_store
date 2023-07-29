namespace BookStore.Services;
using BookStore.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
//JwtSecurityToken
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;
    private readonly SigningCredentials _credentials;
    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"));
        _credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    }
    public string GenerateToken(IEnumerable<Claim> claims, int expireMinutes = 60)
    {

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: _credentials
        );
        return new JwtSecurityTokenHandler().WriteToken(token);

    }

    public ClaimsPrincipal DecodeToken(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = _credentials.Key,
            ValidateIssuer = true,
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = _configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
        };
        return handler.ValidateToken(token, tokenValidationParameters, out _);
    }

    public string TryDecodeToken(string token, out ClaimsPrincipal? claimsPrincipal)
    {
        try
        {
            claimsPrincipal = DecodeToken(token);
            return "";
        }
        catch (SecurityTokenExpiredException)
        {
            claimsPrincipal = null;
            return "Token đã hết hạn";
        }
        catch (Exception)
        {
            claimsPrincipal = null;
            return "Token không hợp lệ";
        }

    }
}