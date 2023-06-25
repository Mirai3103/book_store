using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BookStore.Attributes
{
    public class WithPermissionAttribute : TypeFilterAttribute
    {


        public WithPermissionAttribute(string permissions) : base(typeof(WithPermissionFilter))
        {
            Arguments = new object[]
            {
                permissions.Split(",").Select(p => p.Trim()).ToArray()
            };
        }
    }

    public class WithPermissionFilter : IAuthorizationFilter
    {
        readonly string[] _permissions;

        public WithPermissionFilter(string[] permissions)
        {
            _permissions = permissions;
        }


        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.User.Identity.IsAuthenticated)
            {
                context.Result = new ForbidResult();
                return;
            }
            var hasPermission = _permissions.All(p => context.HttpContext.User.HasClaim("Permission", p));
            if (!hasPermission)
            {
                context.Result = new ForbidResult();
                return;
            }
        }
    }
}
