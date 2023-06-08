using System.Text.Json.Serialization;
using BookStore.Data;
using BookStore.Middleware;
using BookStore.Services;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;

            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.EnableAnnotations();
            });
            var connectionString = builder.Configuration.GetConnectionString("MySQLConnectionString") ?? Environment.GetEnvironmentVariable("MySQLConnectionString");
            builder.Services.AddDbContextPool<BookStoreContext>(
                options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)), 24
            );
            builder.Services.AddTransient<IBookService, BookService>();
            builder.Services.AddTransient<ICategoryService, CategoryService>();
            builder.Services.AddTransient<IAuthorService, AuthorService>();
            builder.Services.AddTransient<IPublisherService, PublisherService>();
            builder.Services.AddTransient<ISeriesService, SeriesService>();
            builder.Services.AddTransient<IProviderService, ProviderService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseExceptionMiddleware();
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();

        }
    }
}
