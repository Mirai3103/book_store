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

}