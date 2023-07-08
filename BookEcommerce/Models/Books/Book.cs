using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Attribute;

namespace BookStore.Models
{
    [TimeStamp(deletedAtColumnName: nameof(DeletedAt), createdAtColumnName: nameof(CreatedAt))]
    public partial class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required][MaxLength(255)] public string Title { get; set; } = null!;

        [MaxLength(255)] public string Name { get; set; } = null!;

        [MaxLength(255)] public string Slug { get; set; } = null!;

        public int AuthorId { get; set; }

        [ForeignKey("AuthorId")] public Author? Author { get; set; }

        public int ProviderId { get; set; }

        [ForeignKey("ProviderId")] public Provider? Provider { get; set; }

        public int PublisherId { get; set; }

        [ForeignKey("PublisherId")] public Publisher? Publisher { get; set; }
        [DataType(DataType.ImageUrl)]
        public string ThumbnailUrl { get; set; } = null!;

        [DataType(DataType.Currency)]
        [Required] public decimal Price { get; set; }

        [MaxLength(20)]
        public string? PublishDate { get; set; }

        [Required][MaxLength(20)] public string? Language { get; set; } = "Tiếng Việt";
        [DataType(DataType.Text)] public string? Description { get; set; }

        public int? SeriesId { get; set; }

        [ForeignKey("SeriesId")] public Series? Series { get; set; }

        [MaxLength(30)] public string? Episode { get; set; }

        public int Stock { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")] public Category? Category { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [DataType(DataType.DateTime)]
        public DateTime? DeletedAt { get; set; } = null;
        public virtual ICollection<BookAttribute> BookAttributes { get; set; } = null!;
        public virtual ICollection<BookImage> BookImages { get; set; } = null!;
        public Book()
        {
            BookAttributes = new HashSet<BookAttribute>();
            BookImages = new HashSet<BookImage>();
        }
    }
}