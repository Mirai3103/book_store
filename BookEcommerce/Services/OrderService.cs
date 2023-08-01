namespace BookStore.Services;
using BookStore.Controllers;
using BookStore.Data;
using BookStore.Exceptions;
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
        return order.AsDto();


    }



    public Task<OrderDto> GetOrderAsync(Guid orderId)
    {
        return _context.Orders.Include(o => o.PaymentDetail).Include(o => o.OrderDetails).ThenInclude(od => od.Book).Where(o => o.Id == orderId).Select(o => o.AsDto()).FirstOrDefaultAsync() ?? throw new NotFoundException("Order not found");
    }
}
