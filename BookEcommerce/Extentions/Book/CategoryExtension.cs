namespace BookStore.Extensions;

using BookStore.Dto;
using BookStore.Models;




public static class CategoryExtension
{
    public static CategoryDto? SelectPreview(this Category? category)
    {
        if (category == null)
        {
            return null;
        }
        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            TotalBooks = category.Books.Count(),
        };
    }
    public static CategoryDto? SelectDetail(this Category? category)
    {
        if (category == null)
        {
            return null;
        }
        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            TotalBooks = category.Books.Count(),
        };
    }
}