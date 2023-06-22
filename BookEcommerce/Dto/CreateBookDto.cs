using System.ComponentModel.DataAnnotations;
using BookStore.Models;

namespace BookStore.Dto;

public class CreateBookDto
{
    [MaxLength(255)]
    public string Title { get; set; } = null!;
    [MaxLength(255)]
    public string Name { get; set; } = null!;
    public int AuthorId { get; set; }
    public int ProviderId { get; set; }
    public int PublisherId { get; set; }
    public IFormFile Thumbnail { get; set; } = null!;
    [DataType(DataType.Currency)]
    public decimal Price { get; set; }
    public string? PublishDate { get; set; }
    [MaxLength(20)]
    public string? Language { get; set; } = "Tiếng Việt";
    [DataType(DataType.Text)]
    public string? Description { get; set; }
    public int? SeriesId { get; set; }
    [MaxLength(30)]
    public string? Episode { get; set; }
    public int? Stock { get; set; } = 0;
    public int CategoryId { get; set; }
    public ICollection<BookAttribute> BookAttributes { get; set; } = new List<BookAttribute>();
    public IFormFileCollection Images { get; set; } = null!;

}