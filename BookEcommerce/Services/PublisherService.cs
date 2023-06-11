

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces;

using BookStore.Exceptions;
using BookStore.Extensions;
public class PublisherService : IPublisherService
{
    private readonly BookStoreContext _dbContext;
    public PublisherService(BookStoreContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PublisherDto> CreatePublisherAsync(PublisherDto publisherDto)
    {
        var publisher = new Publisher
        {
            Name = publisherDto.Name,
            Description = publisherDto.Description,
            DeletedAt = null
        };
        _dbContext.Publishers.Add(publisher);
        await _dbContext.SaveChangesAsync();
        return publisher.SelectPreview()!;
    }

    public async Task DeletePublisherAsync(int id)
    {
        _dbContext.Publishers.Remove(_dbContext.Publishers.Find(id));
        await _dbContext.SaveChangesAsync();
    }

    public Task<PublisherDto?> GetPublisherDetailAsync(int id)
    {
        var publisher = _dbContext.Publishers.Where(a => a.Id == id).Select(a => new PublisherDto()
        {
            Id = a.Id,
            Name = a.Name,
            Description = a.Description,
            TotalBooks = a.Books.Count()
        }).FirstOrDefault();
        return Task.FromResult(publisher);
    }

    public Task<PaginationDto<PublisherDto>> GetPublishersPreviewAsync(int page, int limit, string? search)
    {
        var publishers = _dbContext.Publishers
        .Where(a => a.Name.ContainIgnoreAll(search ?? ""))
        .Select(a => new PublisherDto()
        {
            Id = a.Id,
            Name = a.Name,
            TotalBooks = _dbContext.Books.Count(b => b.PublisherId == a.Id),
        }).ToPagination(page, limit);
        return Task.FromResult(publishers);
    }

    public async Task<PublisherDto> UpdatePublisherAsync(int id, PublisherDto publisherDto)
    {
        var publisher = await _dbContext.Publishers.FindAsync(id);
        if (publisher is null)
        {
            throw new NotFoundException("Không tìm thấy nhà xuất bản");
        }
        publisher.Name = publisherDto.Name;
        publisher.Description = publisherDto.Description!;
        _dbContext.Publishers.Update(publisher);
        await _dbContext.SaveChangesAsync();
        return publisher.SelectPreview()!;
    }
}