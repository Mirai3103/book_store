
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces
{
    public interface IBookService
    {
        Task<PaginationDto<BookPreviewDto>> GetBooksPreviewAsync(int page, int limit);
        Task<BookDto?> GetBookDetailAsync(string slug);
        Task<PaginationDto<BookPreviewDto>> AdvancedSearchAsync(AdvancedSearchDto advancedSearchDto, int page, int limit);
        Task<PaginationDto<BookPreviewDto>> SearchBookAsync(BasicSearchDto basicSearchDto, int page, int limit);
        Task<BookPreviewDto> CreateBookAsync(CreateBookDto createBookDto);
        Task<BookPreviewDto> UpdateBookAsync(int id, UpdateBookDto updateBookDto);
        Task DeleteBookAsync(int id);
        Task<string> UpdateBookCoverAsync(int id, IFormFile cover);
        Task<ICollection<string>> GetAllValidBookSlugsAsync();

    }

}