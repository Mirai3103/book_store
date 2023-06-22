namespace BookStore.Services.Interfaces;
using BookStore.Dto;
using BookStore.Models;
public interface IBookAttributeService
{

    Task CreateBookAttributesAsync(ICollection<BookAttribute> bookAttributes);
    Task DeleteBookAttributesAsync(int bookId, IEnumerable<string> attributeName);
}

