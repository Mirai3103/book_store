namespace BookStore.Extensions;

using BookStore.Models;




public static class PublisherExtension
{
    public static Publisher? SelectPreview(this Publisher? publisher)
    {
        if (publisher == null)
        {
            return null;
        }
        return new Publisher
        {
            Id = publisher.Id,
            Name = publisher.Name,
        };
    }
}