namespace BookStore.Services;
using BookStore.Controllers;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Exceptions;
using BookStore.Models;
using BookStore.Services.Checkout;
using BookStore.Services.Interfaces;
using System;
using System.Threading.Tasks;

public class PaymentService : IPaymentService
{
    private readonly BookStoreContext _context;
    private readonly CheckoutStrategyFactory _checkoutStrategyFactory;
    public PaymentService(BookStoreContext context, CheckoutStrategyFactory checkoutStrategyFactory)
    {
        _context = context;
        _checkoutStrategyFactory = checkoutStrategyFactory;
    }
    public async Task<PaymentDetailDto> CheckPaymentStatusAsync(Guid paymentDetailId, Guid orderId)
    {
        var paymentDetail = _context.PaymentDetails.FirstOrDefault(x => x.Id == paymentDetailId) ?? throw new NotFoundException("Payment detail not found");
        var checkoutStrategy = _checkoutStrategyFactory.GetCheckoutStrategy(paymentDetail.Provider);
        var result = await checkoutStrategy.UpdatePaymentStatusAsync(orderId);
        return paymentDetail.AsDto();
    }
}
