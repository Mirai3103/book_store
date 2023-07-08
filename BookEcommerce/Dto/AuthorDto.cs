using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using BookStore.Models;
namespace BookStore.Dto
{
    public class AuthorDto
    {


        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public int TotalBooks { get; set; }

    }
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
}

