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
            var startUp = new Startup(builder.Configuration);
            startUp.ConfigureServices(builder.Services);
            var app = builder.Build();
            startUp.Configure(app, builder.Environment);

        }
    }
}
