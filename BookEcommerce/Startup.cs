namespace BookStore;

using BookStore.Data;
using BookStore.Middleware;
using BookStore.Services;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }



    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;

        });
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.EnableAnnotations();
        });
        var connectionString = Configuration.GetConnectionString("MySQLConnectionString") ?? Environment.GetEnvironmentVariable("MySQLConnectionString");
        services.AddDbContextPool<BookStoreContext>(
            options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)), 24
        );
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"] ?? "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"))
                };
            });
        services.AddTransient<IBookService, BookService>();
        services.AddTransient<ICategoryService, CategoryService>();
        services.AddTransient<IAuthorService, AuthorService>();
        services.AddTransient<IPublisherService, PublisherService>();
        services.AddTransient<ISeriesService, SeriesService>();
        services.AddTransient<IProviderService, ProviderService>();
        services.AddTransient<IFileService, FileService>();
        services.AddTransient<IBookImageService, BookImageService>();
        services.AddTransient<IBookAttributeService, BookAttributeService>();
        services.AddTransient<IAuthService, AuthService>();
        services.AddTransient<ITokenService, TokenService>();
        services.AddTransient<IRoleService, RoleService>();
        services.AddTransient<IPermissionService, PermissionService>();

    }


    public void Configure(WebApplication app, IWebHostEnvironment env)
    {

        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseExceptionMiddleware();
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}