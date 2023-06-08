namespace BookStore.Dto;
using BookStore.Models;

public class BookPreviewDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public AuthorDto? Author { get; set; }
    public decimal Price { get; set; }
    public string? Episode { get; set; }
    public string ThumbnailUrl { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.Now;


    public BookPreviewDto(int id, string title, string name, string slug, AuthorDto? author, decimal price, string? episode, string thumbnailUrl, DateTime createdAt)
    {
        Id = id;
        Title = title;
        Name = name;
        Slug = slug;
        Author = author;
        Price = price;
        Episode = episode;
        ThumbnailUrl = thumbnailUrl;
        CreatedAt = createdAt;
    }
}