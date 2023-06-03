namespace BookStore.Extensions;

using BookStore.Models;




public static class ProviderExtension
{
    public static Provider? SelectPreview(this Provider? provider)
    {
        if (provider == null)
        {
            return null;
        }
        return new Provider
        {
            Id = provider.Id,
            Name = provider.Name,
        };
    }
}