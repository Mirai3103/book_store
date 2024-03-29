namespace BookStore.Services.Interfaces;

using BookStore.Controllers;
using BookStore.Dto;
using BookStore.Models;


public interface IOrderService
{
    public Task<OrderDto> CreateOrderAsync(OrderRequestDto orderRequestDto);
    public Task<OrderDto> GetOrderAsync(Guid orderId);
    public Task<OrderDto> ReCheckoutAsync(Guid orderId);
    public Task<ICollection<OrderDto>> GetOrdersByUser(Guid userId);
}