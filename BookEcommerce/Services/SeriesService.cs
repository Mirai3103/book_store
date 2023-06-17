

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces;
using BookStore.Utils;
using System.Threading.Tasks;
using BookStore.Exceptions;
using BookStore.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

public class SeriesService : ISeriesService
{
    private readonly BookStoreContext _dbContext;
    public SeriesService(BookStoreContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<SeriesDto> CreateSeriesAsync(SeriesDto seriesDto)
    {
        var author = _dbContext.Authors.FindAsync(seriesDto.AuthorId);
        var publisher = _dbContext.Publishers.FindAsync(seriesDto.PublisherId);
        await Task.WhenAll(author.AsTask(), publisher.AsTask());
        if (author.Result is null)
        {
            throw new NotFoundException("Không tìm thấy tác giả");
        }
        if (publisher.Result is null)
        {
            throw new NotFoundException("Không tìm thấy nhà xuất bản");
        }
        var series = new Series
        {
            Name = seriesDto.Name,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            Slug = seriesDto.Name.GenerateSlug(),
            AuthorId = seriesDto.AuthorId,
            PublisherId = seriesDto.PublisherId,
            Author = author.Result,
            Publisher = publisher.Result,
            DeletedAt = null,
        };
        await _dbContext.Series.AddAsync(series);
        await _dbContext.SaveChangesAsync();
        return series.SelectPreview()!;
    }


    public async Task DeleteSeriesAsync(int id)
    {
        _dbContext.Series.Remove(_dbContext.Series.Find(id));
        await _dbContext.SaveChangesAsync();

    }

    public async Task<PaginationDto<SeriesDto>> GetAllSeriesPreviewAsync(int page, int limit, string? search = "", string? orderBy = null, bool isAscending = true)
    {

        var series = _dbContext.Series.
        Include(s => s.Author).
        Include(s => s.Publisher)
        .Include(s => s.Books)
        .Where(a => a.Name.ContainIgnoreAll(search ?? ""))
        .Select(s =>
         new SeriesDto
         {
             Id = s.Id,
             Name = s.Name,
             UpdatedAt = s.UpdatedAt,
             Slug = s.Slug,
             TotalBooks = s.Books.Count(),
             Author = s.Author.SelectPreview(),
             Publisher = s.Publisher.SelectPreview(),
             LastedBook = s.Books.OrderByDescending(b => b.CreatedAt).Select(b => b.SelectPreview()).FirstOrDefault(),
         }
        );
        if (isAscending)
        {
            series = series.OrderBy(s => s.UpdatedAt);
        }
        else
        {
            series = series.OrderByDescending(s => s.UpdatedAt);
        }
        var result = series.ToPagination(page, limit);
        return await Task.FromResult(result);
    }

    public async Task<PaginationDto<BookPreviewDto>> GetBooksBySeriesAsync(string slug, int page, int limit)
    {
        var series = await _dbContext.Series.Where(a => a.Slug == slug).FirstOrDefaultAsync();
        if (series is null)
        {
            throw new NotFoundException("Không tìm thấy bộ truyện");
        }
        var books = await _dbContext.Books.Where(a => a.SeriesId == series.Id).OrderBy(s => s.CreatedAt).Select(a => a.SelectPreview()!).ToPaginationAsync(page, limit);
        return books;
    }

    public async Task<SeriesDto?> GetSeriesDetailAsync(int id)
    {

        var series = await _dbContext.Series.
                Where(a => a.Id == id).
               Include(a => a.Author).
               Include(a => a.Publisher)
               .Select(s =>
         new SeriesDto
         {
             Id = s.Id,
             Name = s.Name,
             UpdatedAt = s.UpdatedAt,
             Slug = s.Slug,
             TotalBooks = _dbContext.Books.Where(b => b.SeriesId == id).Count(),
             Author = s.Author.SelectPreview(),
             Publisher = s.Publisher.SelectPreview(),
             LastedBook = _dbContext.Books.Where(b => b.SeriesId == id).OrderByDescending(b => b.CreatedAt).Select(b => b.SelectPreview()).FirstOrDefault(),
         }
        ).FirstOrDefaultAsync();
        return series;
    }

    public async Task<SeriesDto?> GetSeriesDetailAsync(string slug)
    {
        var series = await _dbContext.Series.Where(a => a.Slug == slug)
        .
               Include(a => a.Author).
               Include(a => a.Publisher)
               .Include(a => a.Books)
               .Select(s =>
         new SeriesDto
         {
             Id = s.Id,
             Name = s.Name,
             UpdatedAt = s.UpdatedAt,
             Slug = s.Slug,
             TotalBooks = s.Books.Count(),
             Author = s.Author.SelectPreview(),
             Publisher = s.Publisher.SelectPreview(),
             LastedBook = s.Books.OrderByDescending(b => b.CreatedAt).Select(b => b.SelectPreview()).FirstOrDefault(),
         }
        ).FirstOrDefaultAsync();
        return series;

    }

    public async Task<PaginationDto<SeriesDto>> SearchSeriesAsync(string keyword, int page, int limit)
    {
        var series = await _dbContext.Series.Where(a => a.Name.ContainIgnoreAll(keyword)).Select(a =>
        new SeriesDto()
        {
            Author = a.Author.SelectPreview(),
            Publisher = a.Publisher.SelectPreview(),
            LastedBook = _dbContext.Books.Where(b => b.SeriesId == a.Id).OrderByDescending(b => b.CreatedAt).Select(b => b.SelectPreview()).FirstOrDefault(),
            Id = a.Id,
            Name = a.Name,
            Slug = a.Slug,
            TotalBooks = _dbContext.Books.Where(b => b.SeriesId == a.Id).Count(),
            UpdatedAt = a.UpdatedAt,
        }
        )
        .OrderByDescending(a => a.UpdatedAt)
        .ToPaginationAsync(page, limit);
        return series;
    }

    public async Task<SeriesDto> UpdateSeriesAsync(int id, SeriesDto seriesDto)
    {
        var series = await _dbContext.Series.FindAsync(id).AsTask();
        if (series is null)
        {
            throw new NotFoundException("Không tìm thấy bộ truyện");
        }
        try
        {
            series.Name = seriesDto.Name;
            series.UpdatedAt = DateTime.Now;
            series.Slug = seriesDto.Name.GenerateSlug();
            series.AuthorId = seriesDto.AuthorId;
            series.PublisherId = seriesDto.PublisherId;
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new BadRequestException(e.Message);
        }
        return series.SelectPreview()!;

    }
}