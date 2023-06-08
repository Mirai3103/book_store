
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces
{
    public interface IBookService
    {
        Task<PaginationDto<BookPreviewDto>> GetBooksPreviewAsync(int page, int limit);
        Task<BookDto?> GetBookDetailAsync(string slug);
        Task<PaginationDto<BookPreviewDto>> AdvancedSearchAsync(AdvancedSearchDto advancedSearchDto, int page, int limit);

    }

}