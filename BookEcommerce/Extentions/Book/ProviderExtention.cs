namespace BookStore.Extensions;

using BookStore.Dto;
using BookStore.Models;




public static class ProviderExtension
{
    public static ProviderDto? SelectPreview(this Provider? provider)
    {
        if (provider == null)
        {
            return null;
        }
        return new ProviderDto
        {
            Id = provider.Id,
            Name = provider.Name,
            TotalBooks = provider.Books.Count(),
        };
    }
}