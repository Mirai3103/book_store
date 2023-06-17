namespace BookStore.Services;

using System.Threading.Tasks;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Exceptions;
using BookStore.Extensions;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class CategoryService : ICategoryService
{
    private readonly BookStoreContext _context;
    public CategoryService(BookStoreContext context)
    {
        _context = context;
    }

    public Task<CategoryDto> CreateCategoryAsync(CategoryDto categoryDto)
    {
        var category = new Category
        {
            Name = categoryDto.Name,
            Description = categoryDto.Description,
            TotalBooks = 0
        };
        _context.Categories.Add(category);
        _context.SaveChanges();
        return Task.FromResult(category.SelectDetail()!);
    }

    public async Task DeleteCategoryAsync(int id)
    {
        var category = _context.Categories.Find(id);
        if (category == null)
        {
            throw new NotFoundException("Không tìm thấy danh mục sách với id " + id);
        }
        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
    }

    public Task<PaginationDto<CategoryDto>> GetCategoriesPreviewAsync(int page, int limit, string? search = null, string? orderBy = null, bool isAscending = true)
    {
        var categories = from c in _context.Categories
                         where search == null || c.Name.ContainIgnoreAll(search)
                         select new CategoryDto
                         {
                             Id = c.Id,
                             Name = c.Name,
                             Description = c.Description,
                             TotalBooks = _context.Books.Count(b => b.CategoryId == c.Id)
                         };
        if (isAscending)
        {
            categories = categories.OrderBy(a => EF.Property<object>(a, orderBy ?? nameof(CategoryDto.Id)));
        }
        else
        {
            categories = categories.OrderByDescending(a => EF.Property<object>(a, orderBy ?? nameof(CategoryDto.Id)));
        }
        var categoriesPagination = categories.
        ToPagination<CategoryDto>(page, limit);
        return Task.FromResult(categoriesPagination);
    }

    public async Task<CategoryDto?> GetCategoryDetailAsync(int id)
    {
        var category = await _context.Categories
                                        .Where(c => c.Id == id)
                                        .Select(c => new CategoryDto()
                                        {
                                            Id = c.Id,
                                            Name = c.Name,
                                            Description = c.Description,
                                            TotalBooks = c.Books.Count()
                                        })
                                        .FirstOrDefaultAsync();
        return category;
    }

    public async Task<CategoryDto> UpdateCategoryAsync(int id, CategoryDto categoryDto)
    {
        var category = _context.Categories.Find(id);
        if (category == null)
        {
            throw new NotFoundException("Không tìm thấy danh mục sách với id " + id);
        }
        category.Name = categoryDto.Name;
        category.Description = categoryDto.Description;
        await _context.SaveChangesAsync();
        return category.SelectDetail()!;

    }
}
