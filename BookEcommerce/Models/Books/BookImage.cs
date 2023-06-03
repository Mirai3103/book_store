using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    public class BookImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int BookId { get; set; }

        [ForeignKey("BookId")]
        public Book Book { get; set; }

        [DataType(DataType.ImageUrl)]
        public string Url { get; set; }
    }
}
