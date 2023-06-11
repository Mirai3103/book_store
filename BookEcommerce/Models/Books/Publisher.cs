using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Attribute;

namespace BookStore.Models
{

    [TimeStamp(deletedAtColumnName: nameof(DeletedAt))]
    public class Publisher
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = null!;

        [MaxLength(255)] public string Description { get; set; } = "";

        public DateTime? DeletedAt { get; set; } = null;
        public virtual ICollection<Book> Books { get; set; }
        public Publisher()
        {
            Books = new List<Book>();

        }

    }
}
