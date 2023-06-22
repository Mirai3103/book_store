using BookStore.Data;
using BookStore.Models;
using BookStore.Services.Interfaces;
namespace BookStore.Services;

public class BookAttributeService : IBookAttributeService
{
    private readonly BookStoreContext _context;
    public BookAttributeService(BookStoreContext context)
    {
        _context = context;
    }
    public async Task CreateBookAttributesAsync(ICollection<BookAttribute> bookAttributes)
    {
        foreach (var bookAttribute in bookAttributes)
        {
            if (_context.BookAttributes.FirstOrDefault(ba => ba.BookId == bookAttribute.BookId && ba.AttributeName == bookAttribute.AttributeName) == null)
            {
                _context.BookAttributes.Add(bookAttribute);
            }
        }
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBookAttributesAsync(int bookId, IEnumerable<string> attributeName)
    {
        var bookAttributes = _context.BookAttributes.Where(ba => ba.BookId == bookId && attributeName.Contains(ba.AttributeName));
        _context.BookAttributes.RemoveRange(bookAttributes);
        await _context.SaveChangesAsync();
    }
}