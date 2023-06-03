using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{

    public class BookAttribute
    {
        public int BookId { get; set; }
        [ForeignKey("BookId")] public Book Book { get; set; } = null!;
        [Required]
        [MaxLength(50)]

        public string AttributeName { get; set; } = null!;
        [Required]
        [MaxLength(255)]
        public string AttributeValue { get; set; } = null!;

    }
}