using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Attribute;
namespace BookStore.Models
{
    public class OrderDetail
    {
        public int Quantity { get; set; } = 0;
        [DataType(DataType.Currency)]

        public double Price { get; set; } = 0;
        public Guid OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; } = null!;
        public int BookId { get; set; }
        [ForeignKey("BookId")]
        public virtual Book Book { get; set; } = null!;
    }
    public partial class Order
    {
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new HashSet<OrderDetail>();
    }
}