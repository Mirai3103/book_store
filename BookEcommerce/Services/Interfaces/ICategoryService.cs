using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<PaginationDto<CategoryDto>> GetCategoriesPreviewAsync(int page, int limit, string? search = null, string? orderBy = null, bool isAscending = true);
        Task<CategoryDto?> GetCategoryDetailAsync(int id);
        Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto);
        Task DeleteCategoryAsync(int id);
        Task<CategoryDto> UpdateCategoryAsync(int id, CategoryDto categoryDto);
    }

}