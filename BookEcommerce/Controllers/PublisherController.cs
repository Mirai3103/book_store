using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PublisherController : ControllerBase
    {
        private readonly IPublisherService _publisherService;
        public PublisherController(IPublisherService publisherService)
        {
            this._publisherService = publisherService;
        }
        [HttpGet(Name = "GetPublishers")]
        public async Task<IActionResult> GetPublishers([FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string? search = null, [FromQuery] string? orderBy = null, [FromQuery] bool isAscending = true)
        {
            var publishers = await _publisherService.GetPublishersPreviewAsync(page, limit, search, orderBy, isAscending);
            return Ok(publishers);
        }
        [HttpPost(Name = "CreatePublisher")]
        public async Task<IActionResult> CreatePublisher([FromBody] PublisherDto publisherDto)
        {
            var publisher = await _publisherService.CreatePublisherAsync(publisherDto);
            return CreatedAtRoute("GetPublisherDetail", new { id = publisher.Id }, publisher);
        }
        [HttpPut("{id}", Name = "UpdatePublisher")]
        public async Task<IActionResult> UpdatePublisher(int id, [FromBody] PublisherDto publisherDto)
        {
            var publisher = await _publisherService.UpdatePublisherAsync(id, publisherDto);
            return Ok(publisher);
        }
        [HttpDelete("{id}", Name = "DeletePublisher")]
        public async Task<IActionResult> DeletePublisher(int id)
        {
            await _publisherService.DeletePublisherAsync(id);
            return NoContent();
        }
        [HttpGet("{id}", Name = "GetPublisherDetail")]
        public async Task<IActionResult> GetPublisherDetail(int id)
        {
            var publisher = await _publisherService.GetPublisherDetailAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }
            return Ok(publisher);
        }
    }
}