

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces;

using BookStore.Exceptions;
using BookStore.Extensions;
using Microsoft.EntityFrameworkCore;

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

    public Task<PaginationDto<PublisherDto>> GetPublishersPreviewAsync(int page, int limit, string? search = null, string? orderBy = null, bool isAscending = true)
    {
        var publishers = _dbContext.Publishers
        .Where(a => a.Name.ContainIgnoreAll(search ?? ""))
        .Select(a => new PublisherDto()
        {
            Id = a.Id,
            Name = a.Name,
            TotalBooks = _dbContext.Books.Count(b => b.PublisherId == a.Id),
        });

        if (isAscending)
        {
            publishers = publishers.OrderBy(p => EF.Property<object>(p, orderBy ?? nameof(Publisher.Name)));
        }
        else
        {
            publishers = publishers.OrderByDescending(p => EF.Property<object>(p, orderBy ?? nameof(Publisher.Name)));
        }
        var result = publishers.ToPagination(page, limit);
        return Task.FromResult(result);
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