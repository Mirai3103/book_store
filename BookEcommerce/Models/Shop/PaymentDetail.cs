using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Attribute;
namespace BookStore.Models
{
    public enum PaymentProvider
    {
        COD = 0,
        Paypal = 1,
        Momo = 2,
        ZaloPay = 3,
    }
    public enum PaymentStatus
    {
        Pending = 0,
        Success = 1,
        Failed = 2,
    }
    [TimeStamp(createdAtColumnName: nameof(CreatedAt), updatedAtColumnName: nameof(UpdatedAt))]

    public class PaymentDetail
    {
        [Key]
        public Guid Id { get; set; }

        [DataType(DataType.Currency)]
        public double Amount { get; set; }
        [MaxLength(30)]
        public PaymentProvider Provider { get; set; } = PaymentProvider.COD;
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public virtual Order Order { get; set; } = null!;
        [DataType(DataType.Text)]
        public string Metadata { get; set; } = null!;
    }
    public partial class Order
    {
        public Guid? PaymentDetailId { get; set; }
        public virtual PaymentDetail? PaymentDetail { get; set; }
    }
}