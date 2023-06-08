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
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
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
    }
}