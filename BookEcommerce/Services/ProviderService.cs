

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces;

using BookStore.Exceptions;
using BookStore.Extensions;
public class ProviderService : IProviderService
{
    private readonly BookStoreContext _dbContext;
    public ProviderService(BookStoreContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ProviderDto> CreateProviderAsync(ProviderDto providerDto)
    {
        var provider = new Provider
        {
            Name = providerDto.Name,
            Description = providerDto.Description,
            DeletedAt = null
        };
        _dbContext.Providers.Add(provider);
        await _dbContext.SaveChangesAsync();
        return provider.SelectPreview()!;
    }

    public async Task DeleteProviderAsync(int id)
    {
        _dbContext.Providers.Remove(_dbContext.Providers.Find(id));
        await _dbContext.SaveChangesAsync();
    }

    public Task<ProviderDto?> GetProviderDetailAsync(int id)
    {
        var provider = _dbContext.Providers.Where(a => a.Id == id).Select(a => new ProviderDto()
        {
            Id = a.Id,
            Name = a.Name,
            Description = a.Description,
            TotalBooks = a.Books.Count()
        }).FirstOrDefault();
        return Task.FromResult(provider);
    }

    public async Task<PaginationDto<ProviderDto>> GetProvidersPreviewAsync(int page, int limit)
    {
        var providers = await _dbContext.Providers.Select(a => new ProviderDto()
        {
            Id = a.Id,
            Name = a.Name,
            TotalBooks = a.Books.Count(),
        }).ToPaginationAsync(page, limit);
        return providers;
    }

    public async Task<ProviderDto> UpdateProviderAsync(int id, ProviderDto providerDto)
    {
        var provider = await _dbContext.Providers.FindAsync(id);
        if (provider is null)
        {
            throw new NotFoundException("Không tìm thấy nhà cung cấp");
        }
        provider.Name = providerDto.Name;
        provider.Description = providerDto.Description;
        _dbContext.Providers.Update(provider);
        await _dbContext.SaveChangesAsync();
        return provider.SelectPreview()!;
    }
}