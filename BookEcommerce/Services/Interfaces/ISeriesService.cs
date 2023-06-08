namespace BookStore.Services.Interfaces;

using BookStore.Dto;
using BookStore.Models;

public interface ISeriesService
{
    Task<PaginationDto<SeriesDto>> GetAllSeriesPreviewAsync(int page, int limit);
    Task<SeriesDto?> GetSeriesDetailAsync(string slug);
    Task<SeriesDto?> GetSeriesDetailAsync(int id);
    Task<SeriesDto> CreateSeriesAsync(SeriesDto seriesDto);
    Task DeleteSeriesAsync(int id);
    Task<SeriesDto> UpdateSeriesAsync(int id, SeriesDto seriesDto);
    Task<PaginationDto<BookPreviewDto>> GetBooksBySeriesAsync(string slug, int page, int limit);
    Task<PaginationDto<SeriesDto>> SearchSeriesAsync(string keyword, int page, int limit);
}

