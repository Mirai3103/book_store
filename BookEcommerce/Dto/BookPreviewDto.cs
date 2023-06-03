namespace BookStore.Dto;
using BookStore.Models;
public record class BookPreviewDto(
   int Id,
   string Title,
   string Name,
   string Slug,
   Author? Author,
   decimal Price,
   string? Episode,
   string ThumbnailUrl
);