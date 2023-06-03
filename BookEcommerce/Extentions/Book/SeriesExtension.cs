namespace BookStore.Extensions;

using BookStore.Models;


public static class SeriesExtension
{
    public static Series? SelectPreview(this Series? series)
    {
        if (series == null)
        {
            return null;
        }
        return new Series
        {
            Id = series.Id,
            Name = series.Name,
            UpdatedAt = series.UpdatedAt,
            Slug = series.Slug,
        };
    }
}