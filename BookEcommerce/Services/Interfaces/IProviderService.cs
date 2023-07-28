namespace BookStore.Services.Interfaces;
using BookStore.Dto;
public interface IProviderService
{
    Task<PaginationDto<ProviderDto>> GetProvidersPreviewAsync(int page, int limit, string? search = "", string? orderBy = null, bool isAscending = true);
    Task<ProviderDto?> GetProviderDetailAsync(int id);
    Task<ProviderDto> CreateProviderAsync(ProviderDto providerDto);
    Task DeleteProviderAsync(int id);
    Task<ProviderDto> UpdateProviderAsync(int id, ProviderDto providerDto);
    Task<ICollection<ProviderDto>> GetProvidersPreviewAsync(int[] ids);

}

