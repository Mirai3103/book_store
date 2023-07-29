using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Models;

namespace BookStore.Dto
{
    public class BookDto
    {

        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string Slug { get; set; } = null!;

        public int AuthorId { get; set; }

        public AuthorDto? Author { get; set; }

        public int ProviderId { get; set; }

        public ProviderDto? Provider { get; set; }

        public int PublisherId { get; set; }

        public PublisherDto? Publisher { get; set; }

        public string ThumbnailUrl { get; set; } = null!;


        public decimal Price { get; set; }

        public string? PublishDate { get; set; }

        public string? Language { get; set; } = "Tiếng Việt";
        public string? Description { get; set; }

        public int? SeriesId { get; set; }

        public SeriesDto? Series { get; set; }

        public string? Episode { get; set; }

        public int Stock { get; set; }

        public int CategoryId { get; set; }

        public CategoryDto? Category { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public virtual ICollection<BookAttribute> BookAttributes { get; set; } = null!;
        public virtual ICollection<BookImage> BookImages { get; set; } = null!;
    }
}