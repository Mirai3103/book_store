namespace BookStore.Extensions;

using BookStore.Dto;
using BookStore.Models;


public static class SeriesExtension
{
    public static SeriesDto? SelectPreview(this Series? series)
    {
        if (series == null)
        {
            return null;
        }
        return new SeriesDto
        {
            Id = series.Id,
            Name = series.Name,
            UpdatedAt = series.UpdatedAt,
            Slug = series.Slug,
            TotalBooks = series.Books.Count(),
            Author = series.Author.SelectPreview(),
            Publisher = series.Publisher.SelectPreview(),
            LastedBook = series.Books.Select(b => b.SelectPreview()).OrderByDescending(b => b.CreatedAt).FirstOrDefault(),
        };
    }
}