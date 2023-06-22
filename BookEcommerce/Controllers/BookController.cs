using BookStore.Dto;
using BookStore.Exceptions;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IBookImageService _bookImageService;
        public BookController(IBookService bookService, IBookImageService bookImageService)
        {
            _bookService = bookService;
            _bookImageService = bookImageService;
        }
        [HttpGet(Name = "GetBooks")]
        public async Task<IActionResult> GetBooks([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var books = await _bookService.GetBooksPreviewAsync(page, limit);
            return Ok(books);
        }
        [HttpGet("{slug}", Name = "GetBook")]
        public async Task<IActionResult> GetBookDetail(string slug)
        {

            var book = await _bookService.GetBookDetailAsync(slug);
            if (book == null)
            {
                throw new NotFoundException("Book not found");
            }
            return Ok(book);
        }
        [HttpGet("search", Name = "AdvancedSearch")]
        public async Task<IActionResult> AdvancedSearch([FromQuery] AdvancedSearchDto advancedSearchDto, [FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var books = await _bookService.AdvancedSearchAsync(advancedSearchDto, page, limit);
            return Ok(books);
        }
        [HttpPost(Name = "CreateBook")]
        public async Task<IActionResult> CreateBook([FromForm] CreateBookDto createBookDto)
        {
            var result = await _bookService.CreateBookAsync(createBookDto);
            return CreatedAtRoute("GetBook", new { slug = result.Slug, id = result.Id }, result);
        }
        [HttpPut("{id}", Name = "UpdateBook")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] UpdateBookDto updateBookDto)
        {
            var result = await _bookService.UpdateBookAsync(id, updateBookDto);
            return Ok(result);
        }
        [HttpPatch("UpdateBookCover/{id}", Name = "UpdateBookCover")]
        public async Task<IActionResult> UpdateBookCover(int id, [FromForm(Name = "image")] IFormFileCollection image)
        {
            var result = await _bookService.UpdateBookCoverAsync(id, image[0]);
            return Ok(result);
        }
        [HttpPatch("UpdateBookImages/{id}", Name = "UpdateBookImages")]
        public async Task<IActionResult> UpdateBookImages(int id, [FromForm] UpdateBookImageDto images)
        {
            await _bookImageService.UpdateBookImageAsync(id, images);
            return Ok();
        }
    }
}