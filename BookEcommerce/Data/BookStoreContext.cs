using Microsoft.EntityFrameworkCore;
using BookStore.Models;
namespace BookStore.Data
{
    public class BookStoreContext : DbContext
    {




        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Series> Series { get; set; }
        public DbSet<Provider> Providers { get; set; }
        public DbSet<BookImage> BookImages { get; set; }

        protected BookStoreContext() : base()
        {
        }

        public BookStoreContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookAttribute>()
                .HasKey(c => new { c.BookId, c.AttributeName });

        }
    }
}
