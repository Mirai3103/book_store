using BookStore.Dto;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace BookStore.Extensions;
public static class BookExtensions
{
    public static BookPreviewDto SelectPreview(this Book book)
    {
        return new BookPreviewDto(
            book.Id,
            book.Title,
            book.Name,
            book.Slug,
            book.Author.SelectPreview(),
            book.Price,
            book.Episode,
            book.ThumbnailUrl
        );
    }
    public static IQueryable<Book> SetupQuery(this IQueryable<Book> books)
    {
        return books.Where(b => b.DeletedAt == null);
    }
    public static IQueryable<Book> IncludeDetailQuery(this IQueryable<Book> books)
    {
        return books
        .Include(b => b.Author)
        .Include(b => b.Category)
        .Include(b => b.Publisher)
        .Include(b => b.BookAttributes)
        .Include(b => b.BookImages)
        .Include(b => b.Series)
        .AsNoTracking();
    }
    public static Book SelectDetail(this Book book)
    {
        return new Book()
        {
            BookImages = book.BookImages.Select(bi => bi.SelectPreview()).ToList(),
            BookAttributes = book.BookAttributes.Select(ba => ba.SelectPreview()).ToList(),
            Author = book.Author.SelectPreview(),
            Category = book.Category.SelectPreview(),
            Publisher = book.Publisher.SelectPreview(),
            Id = book.Id,
            Title = book.Title,
            Name = book.Name,
            Slug = book.Slug,
            ThumbnailUrl = book.ThumbnailUrl,
            Price = book.Price,
            PublishDate = book.PublishDate,
            Language = book.Language,
            Description = book.Description,
            SeriesId = book.SeriesId,
            Episode = book.Episode,
            Stock = book.Stock,
            CreatedAt = book.CreatedAt,
            Provider = book.Provider,
            Series = book.Series.SelectPreview(),
            AuthorId = book.AuthorId,
            CategoryId = book.CategoryId,
            ProviderId = book.ProviderId,
            PublisherId = book.PublisherId,
        };
    }
    public static IQueryable<Book> SortBy(this IQueryable<Book> books, BookSortType sortType)
    {
        switch (sortType)
        {
            case BookSortType.Newest:
                return books.OrderByDescending(b => b.CreatedAt);
            case BookSortType.Oldest:
                return books.OrderBy(b => b.CreatedAt);
            case BookSortType.PriceAsc:
                return books.OrderBy(b => b.Price);
            case BookSortType.PriceDesc:
                return books.OrderByDescending(b => b.Price);
            case BookSortType.MonthBestSeller:
                return books.OrderBy(b => b.Name);
            case BookSortType.WeekBestSeller:
                return books.OrderByDescending(b => b.Name);
            case BookSortType.YearBestSeller:
                return books.OrderByDescending(b => b.Name);
            default:
                return books.OrderByDescending(b => b.CreatedAt);
        }
    }
}
