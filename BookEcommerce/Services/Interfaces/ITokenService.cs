using System.Collections.Generic;
using System.Security.Claims;

namespace BookStore.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(IEnumerable<Claim> claims, int expireMinutes = 60);
        ClaimsPrincipal DecodeToken(string token);


    }
}