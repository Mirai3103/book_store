using Microsoft.EntityFrameworkCore;
using BookStore.Models;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;
using BookStore.Attribute;
using System.Reflection;

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
        public DbSet<BookAttribute> BookAttributes { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<CartItem> CartItems { get; set; }



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
            modelBuilder.Entity<CartItem>()
  .HasKey(c => new { c.BookId, c.UserId });
            modelBuilder.HasDbFunction(typeof(LikeOperator).GetMethod(nameof(LikeOperator.ContainIgnoreAll)))
                   .HasName("ContainIgnoreAll")
                   .HasTranslation(args =>
                   {
                       var str = args.ElementAt(0);
                       var keyword = args.ElementAt(1);
                       return new SqlFunctionExpression("ContainIgnoreAll", args, nullable: true, argumentsPropagateNullability: new[] { false, false }, typeof(bool), null);
                   });
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                TimeStampAttribute? timeStampAttribute = entityType.ClrType.GetCustomAttribute<TimeStampAttribute>();
                if (timeStampAttribute != null)
                {
                    // entityType.AddProperty(timeStampAttribute.DeletedAtColumnName, typeof(DateTime?));
                    // entityType.AddProperty(timeStampAttribute.CreatedAtColumnName, typeof(DateTime));
                    // entityType.AddProperty(timeStampAttribute.UpdatedAtColumnName, typeof(DateTime?));
                    // entityType.AddProperty(timeStampAttribute.DeletedByColumnName, typeof(string));
                    // entityType.AddProperty(timeStampAttribute.CreatedByColumnName, typeof(string));
                    // entityType.AddProperty(timeStampAttribute.UpdatedByColumnName, typeof(string));
                    if (timeStampAttribute.DeletedAtColumnName != null)
                    {
                        // add query filter
                        var parameter = Expression.Parameter(entityType.ClrType, "e");
                        var propertyMethodInfo = typeof(EF).GetMethod("Property").MakeGenericMethod(typeof(DateTime?));
                        var property = Expression.Call(propertyMethodInfo, parameter, Expression.Constant(timeStampAttribute.DeletedAtColumnName));
                        BinaryExpression compareExpression = Expression.MakeBinary(ExpressionType.Equal, property, Expression.Constant(null, typeof(DateTime?)));
                        var lambda = Expression.Lambda(compareExpression, parameter);
                        modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                    }
                }
            }
        }
        [DbFunction("ContainIgnoreAll")]
        public static bool ContainIgnoreAll(string str, string keyword)
        {
            throw new NotSupportedException();
        }


        public override int SaveChanges()
        {
            HandleDelete();
            HandleCreate();
            HandleUpdate();
            return base.SaveChanges();
        }
        private void HandleCreate()
        {
            var createdEntities = ChangeTracker.Entries()
                          .Where(e => e.State == EntityState.Added);
            foreach (var entity in createdEntities)
            {
                var createdAtColumnName = entity.GetCreatedAtColumnName();
                if (createdAtColumnName != null)
                {
                    entity.Property(createdAtColumnName).CurrentValue = DateTime.Now;
                }
            }
        }
        private void HandleUpdate()
        {
            var updatedEntities = ChangeTracker.Entries()
                          .Where(e => e.State == EntityState.Modified);
            foreach (var entity in updatedEntities)
            {
                var updatedAtColumnName = entity.GetUpdatedAtColumnName();
                if (updatedAtColumnName != null)
                {
                    entity.Property(updatedAtColumnName).CurrentValue = DateTime.Now;
                }
            }
        }
        private void HandleDelete()
        {
            var deletedEntities = ChangeTracker.Entries()
                          .Where(e => e.State == EntityState.Deleted);
            foreach (var entity in deletedEntities)
            {

                var deletedAtColumnName = entity.GetDeletedAtColumnName();
                Console.WriteLine(deletedAtColumnName);
                if (deletedAtColumnName != null)
                {
                    entity.State = EntityState.Modified;
                    entity.Property(deletedAtColumnName).CurrentValue = DateTime.Now;
                }
            }
        }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            HandleDelete();
            return await base.SaveChangesAsync(cancellationToken);
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
