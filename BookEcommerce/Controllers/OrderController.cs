using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookStore.Extensions;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }


        [Authorize]
        [HttpPost(Name = "CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequestDto order)
        {
            var userId = HttpContext.GetUserId();
            order.UserId = userId;
            var orderDetail = await _orderService.CreateOrderAsync(order);
            return CreatedAtRoute("CreateOrder", orderDetail);
        }
        [HttpPost("{orderId}/re-checkout")]
        [Authorize]
        public async Task<IActionResult> ReCheckout([FromRoute] Guid orderId)
        {
            var order = await this._orderService.ReCheckoutAsync(orderId);
            return Ok(order);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById([FromRoute] Guid id)
        {
            var userId = HttpContext.GetUserId();
            var orderDetail = await _orderService.GetOrderAsync(id);
            return Ok(orderDetail);
        }
        [Authorize]
        [HttpGet("my-orders")]
        public async Task<IActionResult> GetOrdersByUser()
        {
            var userId = HttpContext.GetUserId();
            var orderDetails = await _orderService.GetOrdersByUser(userId);
            return Ok(orderDetails);
        }
    }
}