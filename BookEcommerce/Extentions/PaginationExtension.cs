using BookStore.Dto;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Extensions;
public static class PaginationExtensions
{
    public static PaginationDto<T> ToPagination<T>(this IQueryable<T> items, int page, int limit)
    {
        var count = items.Count();
        var data = items.Skip((page - 1) * limit).Take(limit).ToList();
        var totalPages = (int)Math.Ceiling(count / (double)limit);
        return new PaginationDto<T>(data, count, page, totalPages, limit);
    }
    public static async Task<PaginationDto<T>> ToPaginationAsync<T>(this IQueryable<T> items, int page, int limit)
    {
        var count = items.CountAsync();
        var data = items.Skip((page - 1) * limit).Take(limit).ToListAsync();
        await Task.WhenAll(count, data);

        var totalPages = (int)Math.Ceiling(count.Result / (double)limit);
        return new PaginationDto<T>(data.Result, count.Result, page, totalPages, limit);
    }


}