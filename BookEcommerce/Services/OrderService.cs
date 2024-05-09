namespace BookStore.Services;
using BookStore.Controllers;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Exceptions;
using BookStore.Extensions;
using BookStore.Models;
using BookStore.Services.Checkout;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class OrderService : IOrderService
{
    private readonly BookStoreContext _context;
    private readonly CheckoutStrategyFactory _checkoutStrategyFactory;
    public OrderService(BookStoreContext context, CheckoutStrategyFactory checkoutStrategyFactory)
    {
        _context = context;
        _checkoutStrategyFactory = checkoutStrategyFactory;
    }

    public async Task<OrderDto> CreateOrderAsync(OrderRequestDto orderRequestDto)
    {
        var checkoutStrategy = _checkoutStrategyFactory.GetCheckoutStrategy(orderRequestDto.GetPaymentProviderEnum);
        var user = _context.Users.Find(orderRequestDto.UserId) ?? throw new NotFoundException("User not found");
        var address = _context.Addresses.FirstOrDefault(a => a.Id == orderRequestDto.AddressId && a.UserId == orderRequestDto.UserId) ?? throw new NotFoundException("Address not found");
        var order = new Order
        {
            Id = Guid.NewGuid(),
            UserId = orderRequestDto.UserId,
            AddressId = orderRequestDto.AddressId,
            User = user,
            Address = address,
            ShippingFee = 0, // todo calculate shipping fee
        };
        _context.Orders.Add(order);
        var total = order.ShippingFee;
        var bookIdsList = orderRequestDto.OrderDetails.Select(od => od.BookId).ToArray();
        orderRequestDto.OrderDetails.ForEach(od =>
        {
            var book = _context.Books.Find(od.BookId) ?? throw new NotFoundException("Book not found");
            var orderDetail = new OrderDetail
            {
                BookId = od.BookId,
                OrderId = order.Id,
                Book = book,
                Order = order,
                Quantity = od.Quantity,
                Price = (double)book.Price,
            };
            _context.OrderDetails.Add(orderDetail);
            total += orderDetail.Price * orderDetail.Quantity;
        });
        order.Total = total;
        _context.SaveChanges();

        var paymentDetail = await checkoutStrategy.CreatePaymentIntentAsync(order);
        _context.CartItems.RemoveRange(_context.CartItems.Where(ci => bookIdsList.Contains(ci.BookId) && ci.UserId == order.UserId));
        _context.SaveChanges();
        return order.AsDto();


    }

    public async Task<OrderDto> ReCheckoutAsync(Guid orderId)
    {
        var order = _context.Orders.Include(o => o.PaymentDetail).Include(o => o.OrderDetails).FirstOrDefault(o => o.Id == orderId) ?? throw new NotFoundException("Order not found");
        var checkoutStrategy = _checkoutStrategyFactory.GetCheckoutStrategy(order.PaymentDetail!.Provider);

        var paymentDetail = await checkoutStrategy.ReCreatePaymentIntentAsync(order);
        _context.PaymentDetails.Remove(order.PaymentDetail);
        _context.SaveChanges();
        return order.AsDto();

    }
    public Task<OrderDto> GetOrderAsync(Guid orderId)
    {
        return _context.Orders.Include(o => o.PaymentDetail).Include(o => o.OrderDetails).ThenInclude(od => od.Book).Where(o => o.Id == orderId).Select(o => o.AsDto()).FirstOrDefaultAsync() ?? throw new NotFoundException("Order not found");
    }

    public async Task<ICollection<OrderDto>> GetOrdersByUser(Guid userId)
    {
        return await _context.Orders.Include(o => o.PaymentDetail).Include(o => o.Address).Include(o => o.OrderDetails).ThenInclude(od => od.Book).Where(o => o.UserId == userId).Select(o => o.AsDto()).ToListAsync();
    }

    public async Task<Dto.PaginationDto<OrderDto>> GetOrders(OrderStatus? orderStatus, int page = 1, int limit = 24, string sortBy = "CreatedAt", bool isAsc = false)
    {
        var query = _context.Orders.Include(o => o.PaymentDetail).Include(o => o.Address).Include(o => o.OrderDetails).ThenInclude(od => od.Book).AsQueryable();
        if (orderStatus.HasValue)
        {
            query = query.Where(o => o.Status == orderStatus.Value);
        }
        if (isAsc)
        {
            query = query.OrderBy(b => EF.Property<object>(b, sortBy) ?? b.CreatedAt);
        }
        else
        {
            query = query.OrderByDescending(b => EF.Property<object>(b, sortBy) ?? b.CreatedAt);
        }
        var newQuery = query.Select(o => o.AsDto());
        var result = newQuery.ToPagination(page, limit);
        return await Task.FromResult(result);
    }
}
