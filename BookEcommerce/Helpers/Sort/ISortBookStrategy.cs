

namespace BookStore.Helpers.Sort;
using BookStore.Dto;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;
public interface ISortBookStrategy
{
    IQueryable<Book> SortBooks(DbSet<Book> books, string sortBy, bool isAscending);
}