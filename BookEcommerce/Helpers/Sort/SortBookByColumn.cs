namespace BookStore.Helpers.Sort;



using BookStore.Extensions;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;



public class SortBookByColumn : ISortBookStrategy
{
    public IQueryable<Book> SortBooks(DbSet<Book> books, string sortBy, bool isAscending)
    {
        return books.SortBy(sortBy, isAscending);
    }
}