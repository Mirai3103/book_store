namespace BookStore;

using BookStore.Data;
using BookStore.Dto;
using BookStore.Middleware;
using BookStore.Services;
using BookStore.Services.Checkout;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    }));
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
        services.Configure<MailSetting>(Configuration.GetSection("MailSettings"));
        services.AddHttpClient();
        services.Configure<IConfiguration>(Configuration);
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<IPermissionService, PermissionService>();

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAddressService, AddressService>();
        services.AddScoped<IOrderService, OrderService>();

        services.AddTransient<IBookService, BookService>();
        services.AddTransient<ICategoryService, CategoryService>();
        services.AddTransient<IAuthorService, AuthorService>();
        services.AddTransient<IPublisherService, PublisherService>();
        services.AddTransient<ISeriesService, SeriesService>();
        services.AddTransient<IProviderService, ProviderService>();
        services.AddTransient<IFileService, FileService>();
        services.AddTransient<IBookImageService, BookImageService>();
        services.AddTransient<IBookAttributeService, BookAttributeService>();
        services.AddTransient<ICartItemService, CartItemService>();
        services.AddTransient<IMailService, MailService>();
        services.AddTransient<IPaymentService, PaymentService>();
        services.AddTransient<CheckoutStrategyFactory>();

    }


    public void Configure(WebApplication app, IWebHostEnvironment env)
    {

        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("corsapp");
        app.UseExceptionMiddleware();
        //    app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();


        app.Run();
    }
}