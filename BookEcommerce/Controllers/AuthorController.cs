using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;
        public AuthorController(IAuthorService authorService)
        {
            this._authorService = authorService;
        }
        [HttpGet(Name = "GetAuthors")]
        public async Task<IActionResult> GetAuthors([FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string? search = null)
        {
            var authors = await _authorService.GetAuthorsPreviewAsync(page, limit, search);
            return Ok(authors);
        }
        [HttpPost(Name = "CreateAuthor")]
        public async Task<IActionResult> CreateAuthor([FromBody] AuthorDto authorDto)
        {
            var author = await _authorService.CreateAuthorAsync(authorDto);
            return CreatedAtRoute("GetAuthorDetail", new { id = author.Id }, author);
        }
        [HttpPut("{id}", Name = "UpdateAuthor")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] AuthorDto authorDto)
        {
            var author = await _authorService.UpdateAuthorAsync(id, authorDto);
            return Ok(author);
        }
        [HttpDelete("{id}", Name = "DeleteAuthor")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            await _authorService.DeleteAuthorAsync(id);
            return NoContent();
        }
        [HttpGet("{id}", Name = "GetAuthorDetail")]
        public async Task<IActionResult> GetAuthorDetail(int id)
        {
            var author = await _authorService.GetAuthorDetailAsync(id);
            if (author == null)
            {
                return NotFound();
            }
            return Ok(author);
        }
    }
}