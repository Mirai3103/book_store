using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            this._categoryService = categoryService;
        }
        [HttpGet(Name = "GetCategories")]
        public async Task<IActionResult> GetCategories([FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string? search = null, [FromQuery] string? orderBy = null, [FromQuery] bool isAscending = true)
        {
            var categories = await _categoryService.GetCategoriesPreviewAsync(page, limit, search, orderBy, isAscending);
            return Ok(categories);
        }
        [HttpPost(Name = "CreateCategory")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDto categoryDto)
        {
            var category = await _categoryService.CreateCategoryAsync(categoryDto);
            return CreatedAtRoute("GetCategoryDetail", new { id = category.Id }, category);
        }
        [HttpPut("{id}", Name = "UpdateCategory")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDto categoryDto)
        {
            var category = await _categoryService.UpdateCategoryAsync(id, categoryDto);
            return Ok(category);
        }
        [HttpDelete("{id}", Name = "DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _categoryService.DeleteCategoryAsync(id);
            return NoContent();
        }
        [HttpGet("{id}", Name = "GetCategoryDetail")]
        public async Task<IActionResult> GetCategoryDetail(int id)
        {
            var category = await _categoryService.GetCategoryDetailAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
    }
}