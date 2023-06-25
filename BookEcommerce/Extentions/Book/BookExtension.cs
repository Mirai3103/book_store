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
            book.ThumbnailUrl,
            book.CreatedAt
        );
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
        .Include(b => b.Provider)
        .AsNoTracking();
    }
    public static BookDto SelectDetail(this Book book)
    {
        return new BookDto()
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
            Provider = book.Provider.SelectPreview(),
            Series = book.Series.SelectPreview(),
            AuthorId = book.AuthorId,
            CategoryId = book.CategoryId,
            ProviderId = book.ProviderId,
            PublisherId = book.PublisherId,
        };
    }
    public static IQueryable<Book> SortBy(this IQueryable<Book> books, string sortBy = "Id", bool isAsc = true)
    {
        if (isAsc)
        {
            return books.OrderBy(b => EF.Property<object>(b, sortBy) ?? b.Id);
        }
        else
        {
            return books.OrderByDescending(b => EF.Property<object>(b, sortBy) ?? b.Id);
        }
    }
}
