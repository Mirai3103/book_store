namespace BookStore.Dto;
using BookStore.Models;
using BookStore.Extensions;

public class PaymentDetailDto
{
    public Guid Id { get; set; }

    public double Amount { get; set; }
    public PaymentProvider Provider { get; set; } = PaymentProvider.COD;
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    public string Metadata { get; set; } = null!;
}
public static class PaymentDetailDtoExtension
{
    public static PaymentDetailDto AsDto(this PaymentDetail paymentDetail)
    {
        return new PaymentDetailDto
        {
            Id = paymentDetail.Id,
            Amount = paymentDetail.Amount,
            Provider = paymentDetail.Provider,
            Status = paymentDetail.Status,
            CreatedAt = paymentDetail.CreatedAt,
            UpdatedAt = paymentDetail.UpdatedAt,
            Metadata = paymentDetail.Metadata,
        };
    }
}