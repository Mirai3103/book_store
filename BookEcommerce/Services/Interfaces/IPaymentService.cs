namespace BookStore.Services.Interfaces;

using BookStore.Controllers;
using BookStore.Dto;
using BookStore.Models;


public interface IPaymentService
{
    public Task<PaymentDetailDto> CheckPaymentStatusAsync(Guid paymentDetailId, Guid orderId);
}