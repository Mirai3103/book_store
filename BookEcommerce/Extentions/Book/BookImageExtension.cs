namespace BookStore.Extensions;

using BookStore.Models;




public static class BookImageExtension
{
    public static BookImage SelectPreview(this BookImage bookImage)
    {
        return new BookImage
        {
            Url = bookImage.Url,
        };
    }
}