namespace BookStore.Extensions;

using BookStore.Models;




public static class BookAttributeExtension
{
    public static BookAttribute SelectPreview(this BookAttribute bookAttribute)
    {
        return new BookAttribute
        {
            AttributeName = bookAttribute.AttributeName,
            AttributeValue = bookAttribute.AttributeValue
        };
    }
}