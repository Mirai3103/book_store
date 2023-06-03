namespace BookStore.Services;

using System.Threading.Tasks;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Extensions;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class BookService : IBookService
{
    private readonly BookStoreContext _context;

    public BookService(BookStoreContext context)
    {
        _context = context;
    }

    public Task<PaginationDto<BookPreviewDto>> AdvancedSearchAsync(AdvancedSearchDto advancedSearchDto, int page, int limit)
    {
        throw new NotImplementedException();
    }

    public Task<Book?> GetBookDetailAsync(string slug)
    {
        var book = _context.Books
        .SetupQuery()
        .IncludeDetailQuery()
        .Where(b => b.Slug == slug)
        .Select(b => b.SelectDetail())
        .FirstOrDefaultAsync();

        return book;
    }

    public Task<PaginationDto<BookPreviewDto>> GetBooksPreviewAsync(int page, int limit)
    {
        var bookPreviews = _context.Books.SetupQuery().Include(b => b.Author).SortBy(BookSortType.Newest).Select(b => b.SelectPreview()).ToPagination<BookPreviewDto>(page, limit);
        return Task.FromResult(bookPreviews);
    }
}