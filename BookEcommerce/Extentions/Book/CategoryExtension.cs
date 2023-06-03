namespace BookStore.Extensions;

using BookStore.Models;




public static class CategoryExtension
{
    public static Category? SelectPreview(this Category? category)
    {
        if (category == null)
        {
            return null;
        }
        return new Category
        {
            Id = category.Id,
            Name = category.Name,
        };
    }
}