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
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById([FromRoute] Guid id)
        {
            var userId = HttpContext.GetUserId();
            var orderDetail = await _orderService.GetOrderAsync(id);
            return Ok(orderDetail);
        }
    }
}