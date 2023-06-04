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
            builder.Services.AddSwaggerGen();
            var connectionString = builder.Configuration.GetConnectionString("MySQLConnectionString") ?? Environment.GetEnvironmentVariable("MySQLConnectionString");
            builder.Services.AddDbContext<BookStoreContext>(
                options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
            );
            builder.Services.AddTransient<IBookService, BookService>();


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
