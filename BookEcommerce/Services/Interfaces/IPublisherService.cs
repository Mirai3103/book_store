namespace BookStore.Services.Interfaces;
using BookStore.Dto;
public interface IPublisherService
{
    Task<PaginationDto<PublisherDto>> GetPublishersPreviewAsync(int page, int limit, string? search = "", string? orderBy = null, bool isAscending = true);
    Task<PublisherDto?> GetPublisherDetailAsync(int id);
    Task<PublisherDto> CreatePublisherAsync(PublisherDto publisherDto);
    Task DeletePublisherAsync(int id);
    Task<PublisherDto> UpdatePublisherAsync(int id, PublisherDto publisherDto);
    Task<ICollection<PublisherDto>> GetPublishersPreviewAsync(int[] ids);

}

