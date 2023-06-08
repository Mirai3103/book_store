using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProviderController : ControllerBase
    {
        private readonly IProviderService _providerService;
        public ProviderController(IProviderService providerService)
        {
            this._providerService = providerService;
        }
        [HttpGet(Name = "GetProviders")]
        public async Task<IActionResult> GetProviders([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var providers = await _providerService.GetProvidersPreviewAsync(page, limit);
            return Ok(providers);
        }
        [HttpPost(Name = "CreateProvider")]
        public async Task<IActionResult> CreateProvider([FromBody] ProviderDto providerDto)
        {
            var provider = await _providerService.CreateProviderAsync(providerDto);
            return CreatedAtRoute("GetProviderDetail", new { id = provider.Id }, provider);
        }
        [HttpPut("{id}", Name = "UpdateProvider")]
        public async Task<IActionResult> UpdateProvider(int id, [FromBody] ProviderDto providerDto)
        {
            var provider = await _providerService.UpdateProviderAsync(id, providerDto);
            return Ok(provider);
        }
        [HttpDelete("{id}", Name = "DeleteProvider")]
        public async Task<IActionResult> DeleteProvider(int id)
        {
            await _providerService.DeleteProviderAsync(id);
            return NoContent();
        }
        [HttpGet("{id}", Name = "GetProviderDetail")]
        public async Task<IActionResult> GetProviderDetail(int id)
        {
            var provider = await _providerService.GetProviderDetailAsync(id);
            if (provider == null)
            {
                return NotFound();
            }
            return Ok(provider);
        }
    }
}