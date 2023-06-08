namespace BookStore.Extensions;

using BookStore.Dto;
using BookStore.Models;




public static class PublisherExtension
{
    public static PublisherDto? SelectPreview(this Publisher? publisher)
    {
        if (publisher == null)
        {
            return null;
        }
        return new PublisherDto
        {
            Id = publisher.Id,
            Name = publisher.Name,
            TotalBooks = publisher.Books.Count(),
        };
    }
}