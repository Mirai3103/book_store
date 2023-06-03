using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    public class Series
    {
        [Key]

        public int Id { get; set; }

        [MaxLength(255)]
        public string Name { get; set; } = null!;

        [MaxLength(255)]
        public string Slug { get; set; } = null!;

        public int? AuthorId { get; set; }

        [ForeignKey("AuthorId")]
        public Author Author { get; set; }

        public int? PublisherId { get; set; }

        [ForeignKey("PublisherId")]
        public Publisher Publisher { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        public List<Book> Books { get; set; }


    }

}
