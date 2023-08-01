using BookStore.Data;
using BookStore.Exceptions;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Services.Checkout;


public class CODStrategy : ICheckoutStrategy
{
    private readonly BookStoreContext _context;
    public CODStrategy(BookStoreContext context)
    {
        _context = context;
    }

    public Task<PaymentDetail> GetPaymentAsync(Guid paymentDetailId)
    {
        var paymentDetail = _context.PaymentDetails.Find(paymentDetailId) ?? throw new NotFoundException("PaymentDetail not found");
        return Task.FromResult(paymentDetail);
    }

    public Task<PaymentDetail> CreatePaymentIntentAsync(Order order)
    {
        var paymentDetail = new PaymentDetail
        {
            Id = Guid.NewGuid(),
            Amount = order.Total,
            Provider = PaymentProvider.COD,
            Status = PaymentStatus.Pending,
            Order = order,
            Metadata = order.Id.ToString(),
        };
        _context.PaymentDetails.Add(paymentDetail);
        order.PaymentDetail = paymentDetail;
        order.PaymentDetailId = paymentDetail.Id;
        _context.Orders.Update(order);
        _context.SaveChanges();
        return Task.FromResult(paymentDetail);
    }

    public Task<PaymentDetail> UpdatePaymentStatusAsync(Guid orderId, PaymentStatus status = PaymentStatus.Pending)
    {
        var order = _context.Orders.Include(o => o.PaymentDetail).FirstOrDefault(o => o.Id == orderId) ?? throw new NotFoundException("Order not found");
        order.PaymentDetail.Status = status;
        _context.Orders.Update(order);
        _context.SaveChanges();
        return Task.FromResult(order.PaymentDetail);
    }
}