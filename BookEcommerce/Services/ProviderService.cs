

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces;

using BookStore.Exceptions;
using BookStore.Extensions;
using Microsoft.EntityFrameworkCore;

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

    public Task<PaginationDto<ProviderDto>> GetProvidersPreviewAsync(int page, int limit, string? search = null, string? orderBy = null, bool isAscending = true)
    {
        var providers = _dbContext.Providers
        .Where(a => a.Name.ContainIgnoreAll(search ?? ""))
        .Select(a => new ProviderDto()
        {
            Id = a.Id,
            Name = a.Name,
            TotalBooks = _dbContext.Books.Count(b => b.ProviderId == a.Id),
        });

        if (isAscending)
        {
            providers = providers.OrderBy(p => EF.Property<object>(p, orderBy ?? nameof(Provider.Name)));
        }
        else
        {
            providers = providers.OrderByDescending(p => EF.Property<object>(p, orderBy ?? nameof(Provider.Name)));
        }

        var rs = providers.ToPagination(page, limit);
        return Task.FromResult(rs);
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