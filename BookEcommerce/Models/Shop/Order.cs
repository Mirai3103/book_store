
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Attribute;
namespace BookStore.Models
{
    public enum OrderStatus
    {
        Pending = 0,
        Shipping = 1,
        Delivered = 2,
        Cancelled = 3,
    }

    [TimeStamp(createdAtColumnName: nameof(CreatedAt), deletedAtColumnName: nameof(DeletedAt))]
    public partial class Order
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; } = null;
        public Guid UserId { get; set; }
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
        [DataType(DataType.Currency)]
        public double Total { get; set; } = 0;
        [DataType(DataType.Currency)]
        public double ShippingFee { get; set; } = 0;
        public int AddressId { get; set; }
        [ForeignKey("AddressId")]
        public virtual Address Address { get; set; } = null!;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
    }
    public partial class User
    {
        public virtual ICollection<Order> Orders { get; set; } = new HashSet<Order>();
    }
    public partial class Address
    {
        public virtual ICollection<Order> Orders { get; set; } = new HashSet<Order>();
    }

}
