using Microsoft.EntityFrameworkCore;
using BookStore.Models;
using BookStore.Utils;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;

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

        public override DatabaseFacade Database => base.Database;

        public override ChangeTracker ChangeTracker => base.ChangeTracker;

        public override IModel Model => base.Model;

        public override DbContextId ContextId => base.ContextId;

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
            modelBuilder.HasDbFunction(typeof(LikeOperator).GetMethod(nameof(LikeOperator.ContainIgnoreAll)))
                   .HasName("ContainIgnoreAll")
                   .HasTranslation(args =>
                   {
                       var str = args.ElementAt(0);
                       var keyword = args.ElementAt(1);
                       return new SqlFunctionExpression("ContainIgnoreAll", args, nullable: true, argumentsPropagateNullability: new[] { false, false }, typeof(bool), null);
                   });
        }
        [DbFunction("ContainIgnoreAll")]
        public static bool ContainIgnoreAll(string str, string keyword)
        {
            throw new NotSupportedException();
        }


        public override int SaveChanges()
        {
            var deletedEntities = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Deleted);
            foreach (var entity in deletedEntities)
            {
                entity.State = EntityState.Modified;
                entity.Property("DeletedAt").CurrentValue = DateTime.Now;
            }
            return base.SaveChanges();
        }


    }
    public static class LikeOperator
    {
        [DbFunction("ContainIgnoreAll")]
        public static bool ContainIgnoreAll(this string str, string keyword)
        {
            throw new NotSupportedException();
        }
    }
}
