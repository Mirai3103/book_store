
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Extensions;


public static class AuthorExtension
{
    public static AuthorDto? SelectPreview(this Author? author)
    {
        if (author == null)
        {
            return null;
        }
        return new AuthorDto
        {
            Id = author.Id,
            Name = author.Name,
            TotalBooks = author.Books.Count,
        };
    }
}