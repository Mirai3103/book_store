using System.Net;
using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookStore.Extensions;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        [HttpGet("check-status")]
        [Authorize]
        public async Task<IActionResult> CheckPaymentStatus([FromQuery] Guid paymentId, [FromQuery] Guid orderId)
        {
            var paymentDetail = await _paymentService.CheckPaymentStatusAsync(paymentId, orderId);
            return Ok(paymentDetail);
        }
        [HttpPost("momo/notify")]
        [AllowAnonymous]
        public async Task<IActionResult> MomoNotify()
        {
            string bodyJson = await new StreamReader(Request.Body).ReadToEndAsync();
            Console.WriteLine(bodyJson);
            return NoContent();
        }
    }
}