using System.Security.Claims;
using BookStore.Dto;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Extensions;

public static class HttpContextExtension
{
    public static Guid GetUserId(this HttpContext httpContext)
    {
        var exp = httpContext.User.Claims.FirstOrDefault(c => c.Type == "exp");
        if (exp != null)
        {

            Console.WriteLine($"exprireInMinutes: {exp}");
        }

        var userId = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Guid.Empty;
        }
        return Guid.Parse(userId.Value);
    }
    public static ICollection<string> GetPermissions(this HttpContext httpContext)
    {
        var permissions = httpContext.User.Claims.Where(c => c.Type == "Permission").Select(c => c.Value).ToList();
        return permissions;
    }
    public static ICollection<string> GetRoles(this HttpContext httpContext)
    {
        var roles = httpContext.User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
        return roles;
    }
    public static bool IsHasPermission(this HttpContext httpContext, string permission)
    {
        var permissions = httpContext.GetPermissions();
        return permissions.Contains(permission);
    }
}