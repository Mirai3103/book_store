namespace BookStore.Services.Interfaces;
using BookStore.Dto;
using BookStore.Models;
public interface IBookAttributeService
{
    Task<PaginationDto<BookAttribute>> GetBookAttributesPreviewAsync(int page, int limit);
    Task<BookAttribute?> GetBookAttributeDetailAsync(int id);
    Task<BookAttribute> CreateBookAttributeAsync(BookAttribute categoryDto);
    Task DeleteBookAttributeAsync(int id);
    Task<BookAttribute> UpdateBookAttributeAsync(int id, BookAttribute categoryDto);
}

