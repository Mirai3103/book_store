
using BookStore.Models;

namespace BookStore.Extensions;


public static class AuthorExtension
{
    public static Author? SelectPreview(this Author? author)
    {
        if (author == null)
        {
            return null;
        }
        return new Author
        {
            Id = author.Id,
            Name = author.Name,
        };
    }
}