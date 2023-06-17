using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeriesController : ControllerBase
    {
        private readonly ISeriesService _seriesService;
        public SeriesController(ISeriesService seriesService)
        {
            this._seriesService = seriesService;
        }
        [HttpGet(Name = "GetAllSeries")]
        public async Task<IActionResult> GetAllSeries([FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string? search = null, [FromQuery] string? orderBy = null, [FromQuery] bool isAscending = true)
        {

            var series = await _seriesService.GetAllSeriesPreviewAsync(page, limit, search, orderBy, isAscending);
            return Ok(series);
        }
        [HttpPost(Name = "CreateSeries")]
        public async Task<IActionResult> CreateSeries([FromBody] SeriesDto seriesDto)
        {
            var series = await _seriesService.CreateSeriesAsync(seriesDto);
            return CreatedAtRoute("GetSeriesDetail", new { id = series.Id }, series);
        }
        [HttpPut("{id}", Name = "UpdateSeries")]
        public async Task<IActionResult> UpdateSeries(int id, [FromBody] SeriesDto seriesDto)
        {
            var series = await _seriesService.UpdateSeriesAsync(id, seriesDto);
            return Ok(series);
        }
        [HttpDelete("{id}", Name = "DeleteSeries")]
        public async Task<IActionResult> DeleteSeries(int id)
        {
            await _seriesService.DeleteSeriesAsync(id);
            return NoContent();
        }
        [HttpGet("{id}", Name = "GetSeriesDetail")]
        public async Task<IActionResult> GetSeriesDetail(int id)
        {
            var series = await _seriesService.GetSeriesDetailAsync(id);
            if (series == null)
            {
                return NotFound();
            }
            return Ok(series);
        }
        [HttpGet("slug/{slug}", Name = "GetSeriesDetailBySlug")]
        public async Task<IActionResult> GetSeriesDetailBySlug(string slug)
        {
            var series = await _seriesService.GetSeriesDetailAsync(slug);
            if (series == null)
            {
                return NotFound();
            }
            return Ok(series);
        }
        [HttpGet("slug/{slug}/books", Name = "GetBooksBySeriesSlug")]
        public async Task<IActionResult> GetBooksBySeriesSlug(string slug, [FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var books = await _seriesService.GetBooksBySeriesAsync(slug, page, limit);
            return Ok(books);
        }

    }
}