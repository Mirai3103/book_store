using BookStore.Models;

namespace BookStore.Services.Checkout;

public interface ICheckoutStrategy
{
    Task<PaymentDetail> CreatePaymentIntentAsync(Order order);
    Task<PaymentDetail> GetPaymentAsync(Guid paymentDetailId);
    Task<PaymentDetail> UpdatePaymentStatusAsync(Guid orderId, PaymentStatus status = PaymentStatus.Pending);

}