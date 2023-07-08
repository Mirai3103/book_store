
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Attribute;
namespace BookStore.Models
{

    [TimeStamp(updatedAtColumnName: nameof(UpdatedAt), createdAtColumnName: nameof(CreatedAt))]
    public class CartItem
    {
        public Guid UserId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public virtual User User { get; set; } = null!;
        [ForeignKey("BookId")]
        public Book Book { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
    public partial class User
    {
        public virtual ICollection<CartItem> CartItems { get; set; } = new HashSet<CartItem>();
    }
    public partial class Book
    {
        public virtual ICollection<CartItem> CartItems { get; set; } = new HashSet<CartItem>();
    }
}