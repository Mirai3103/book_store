namespace BookStore.Services;

using System.Threading.Tasks;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Exceptions;
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

        var bookPreviews = _context.Books
            .SetupQuery()
            .Include(b => b.Author)
            .AsNoTracking();
        if (advancedSearchDto.keyword != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Name.ContainIgnoreAll(advancedSearchDto.keyword));
        }
        if (advancedSearchDto.authorId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.AuthorId == advancedSearchDto.authorId);
        }
        if (advancedSearchDto.categoryId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.CategoryId == advancedSearchDto.categoryId);
        }
        if (advancedSearchDto.providerId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.ProviderId == advancedSearchDto.providerId);
        }
        if (advancedSearchDto.publisherId != null)
        {
            bookPreviews = bookPreviews.Where(b => b.PublisherId == advancedSearchDto.publisherId);

        }
        if (advancedSearchDto.minPrice != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Price >= advancedSearchDto.minPrice);
        }
        if (advancedSearchDto.maxPrice != null)
        {
            bookPreviews = bookPreviews.Where(b => b.Price <= advancedSearchDto.maxPrice);
        }
        bookPreviews = bookPreviews.SortBy(advancedSearchDto.sort);
        var bookPreviewsPagination = bookPreviews.Select(b => b.SelectPreview()).ToPagination<BookPreviewDto>(page, limit);
        return Task.FromResult(bookPreviewsPagination);
    }

    public async Task<BookDto?> GetBookDetailAsync(string slug)
    {
        var book = await _context.Books
        .SetupQuery()
        .IncludeDetailQuery()
        .Where(b => b.Slug == slug)
        .Select(b => b.SelectDetail())
        .FirstOrDefaultAsync();


        return book;
    }

    public Task<PaginationDto<BookPreviewDto>> GetBooksPreviewAsync(int page, int limit)
    {
        var bookPreviews = _context.Books.SetupQuery().Include(b => b.Author).SortBy(BookSortType.Newest).Select(b => b.SelectPreview()).ToPaginationAsync<BookPreviewDto>(page, limit);
        return bookPreviews;
    }
}