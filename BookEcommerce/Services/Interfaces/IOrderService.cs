namespace BookStore.Services.Interfaces;

using BookStore.Controllers;
using BookStore.Dto;
using BookStore.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

public interface IOrderService
{
    public Task<OrderDto> CreateOrderAsync(OrderRequestDto orderRequestDto);
    public Task<OrderDto> GetOrderAsync(Guid orderId);
    public Task<OrderDto> ReCheckoutAsync(Guid orderId);
    public Task<ICollection<OrderDto>> GetOrdersByUser(Guid userId);
    public Task<PaginationDto<OrderDto>> GetOrders(OrderStatus? orderStatus, int page = 1, int limit = 24, string sortBy = "CreatedAt", bool isAsc = false);
}