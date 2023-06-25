using BookStore.Services;
using BookStore.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;

namespace Test
{
    public class Tests
    {
        private ITokenService _tokenService;
        [SetUp]
        public void Setup()
        {
            var services = new ServiceCollection();
            var configuration = new ConfigurationBuilder().AddJsonFile("D:\\Work spaces\\dotNet\\BookEcommerce\\BookEcommerce\\appsettings.json").Build();
            services.AddSingleton<IConfiguration>(configuration);
            services.AddScoped<ITokenService, TokenService>();
            var serviceProvider = services.BuildServiceProvider();
            _tokenService = serviceProvider.GetService<ITokenService>();

        }

        [Test]
        public void Test1()
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, "test"),
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, "Admin"),
            new Claim(ClaimTypes.Role, "User")
        };
            var token = _tokenService.GenerateToken(claims);
            Assert.IsNotNull(token);
            Console.WriteLine(token);
            var claimsPrincipal = _tokenService.DecodeToken(token);
            Assert.IsNotNull(claimsPrincipal);
            Assert.AreEqual(claimsPrincipal.Identity.Name, "test");
            Assert.AreEqual(claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value, "1");
            // has any role of Admin or User

            Assert.IsTrue(claimsPrincipal.Claims.Any(x => x.Type == ClaimTypes.Role && (x.Value == "Admin")));

            Assert.IsTrue(claimsPrincipal.Claims.Any(x => x.Type == ClaimTypes.Role && (x.Value == "User")));

        }
    }
}