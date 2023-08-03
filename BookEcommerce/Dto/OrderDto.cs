using BookStore.Dto;
using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using BookStore.Extensions;
namespace BookStore.Controllers
{
    public class OrderRequestDto
    {
        public string PaymentProviderString { get; set; } = null!;
        public PaymentProvider GetPaymentProviderEnum => PaymentProviderString.ToUpper() switch
        {
            "COD" => PaymentProvider.COD,
            "MOMO" => PaymentProvider.Momo,
            _ => throw new ArgumentException("Invalid payment provider"),
        };
        public Guid UserId { get; set; }
        public int AddressId { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; } = new List<OrderDetailDto>();
    }
    public class OrderDetailDto
    {
        public int Quantity { get; set; } = 0;
        public int BookId { get; set; }
        public BookPreviewDto? Book { get; set; }

    }

    public class OrderDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int AddressId { get; set; }
        public double ShippingFee { get; set; }
        public double Total { get; set; }
        public PaymentDetailDto? PaymentDetail { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; } = new List<OrderDetailDto>();
        public AddressDto Address { get; set; } = null!;
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    public static class OrderDtoExtension
    {
        public static OrderDto AsDto(this Order order)
        {
            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                AddressId = order.AddressId,
                ShippingFee = order.ShippingFee,
                Total = order.Total,
                PaymentDetail = order.PaymentDetail?.AsDto(),
                OrderDetails = order.OrderDetails.Select(x => x.AsDto()).ToList(),
                Address = order.Address.AsDto(),
                Status = order.Status,
                CreatedAt = order.CreatedAt
            };
        }
        public static OrderDetailDto AsDto(this OrderDetail orderDetail)
        {
            return new OrderDetailDto
            {
                Quantity = orderDetail.Quantity,
                BookId = orderDetail.BookId,
                Book = orderDetail.Book.SelectPreview(),
            };
        }
    }
}