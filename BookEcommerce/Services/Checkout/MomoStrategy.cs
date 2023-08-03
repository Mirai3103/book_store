
using BookStore.Data;
using BookStore.Exceptions;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace BookStore.Services.Checkout;


public class MomoStrategy : ICheckoutStrategy
{
    private readonly BookStoreContext _context;
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _momoPartnerCode;
    private readonly string _momoAccessKey;
    private readonly string _momoSecretKey;
    private readonly string _momoApiEndpoint;
    private readonly string _momoReturnUrl;
    private readonly string _momoNotifyUrl;
    public MomoStrategy(BookStoreContext context, IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
        _momoPartnerCode = _configuration["Momo:PartnerCode"] ?? throw new NotFoundException("Momo:PartnerCode not found");
        _momoAccessKey = _configuration["Momo:AccessKey"] ?? throw new NotFoundException("Momo:AccessKey not found");
        _momoSecretKey = _configuration["Momo:SecretKey"] ?? throw new NotFoundException("Momo:SecretKey not found");
        _momoApiEndpoint = _configuration["Momo:ApiEndpoint"] ?? throw new NotFoundException("Momo:ApiEndpoint not found");
        _momoReturnUrl = _configuration["Momo:CallbackUrl"] ?? throw new NotFoundException("Momo:CallbackUrl not found");
        _momoNotifyUrl = _configuration["Momo:NotifyUrl"] ?? throw new NotFoundException("Momo:NotifyUrl not found");

    }
    public async Task<PaymentDetail> CreatePaymentIntentAsync(Order order)
    {
        var orderId = order.Id.ToString();
        var requestId = Guid.NewGuid();
        var amount = order.Total.ToString();
        var orderInfo = $"Thanh toan don hang {orderId}";
        var requestType = "captureWallet";
        var extraData = $"";

        var rawSignature = $"accessKey={_momoAccessKey}&amount={amount}&extraData={extraData}&ipnUrl={_momoNotifyUrl}&orderId={orderId}&orderInfo={orderInfo}&partnerCode={_momoPartnerCode}&redirectUrl={_momoReturnUrl}&requestId={requestId.ToString()}&requestType={requestType}";
        var signature = signSHA256(rawSignature, _momoSecretKey);
        var paymentDetail = new PaymentDetail()
        {
            Amount = order.Total,
            CreatedAt = DateTime.Now,
            Id = requestId,
            Provider = PaymentProvider.Momo,
            Status = PaymentStatus.Pending,
        };
        var client = _httpClientFactory.CreateClient();

        var body = JsonSerializer.Serialize(new
        {
            partnerCode = _momoPartnerCode,
            partnerName = "Test",
            storeId = "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl = _momoReturnUrl,
            ipnUrl = _momoNotifyUrl,
            lang = "en",
            extraData,
            requestType,
            signature,
            accessKey = _momoAccessKey,
        });
        var content = new StringContent(body, Encoding.UTF8, "application/json");
        var response = await client.PostAsync(_momoApiEndpoint + "v2/gateway/api/create", content);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            paymentDetail.Metadata = responseContent;
        }
        else
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            throw new BadRequestException(responseContent);

        }
        await _context.PaymentDetails.AddAsync(paymentDetail);
        order.PaymentDetailId = paymentDetail.Id;
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
        return paymentDetail;

    }
    private string signSHA256(string message, string key)
    {
        byte[] keyByte = Encoding.UTF8.GetBytes(key);
        byte[] messageBytes = Encoding.UTF8.GetBytes(message);
        using (var hmacsha256 = new HMACSHA256(keyByte))
        {
            byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
            string hex = BitConverter.ToString(hashmessage);
            hex = hex.Replace("-", "").ToLower();
            return hex;

        }
    }
    public Task<PaymentDetail> GetPaymentAsync(Guid paymentDetailId)
    {
        throw new NotImplementedException();
    }

    public async Task<PaymentDetail> UpdatePaymentStatusAsync(Guid orderId, PaymentStatus status)
    {
        var order = _context.Orders.Include(o => o.PaymentDetail).FirstOrDefault(o => o.Id == orderId) ?? throw new NotFoundException("Order not found");
        var orderIdStr = order.Id.ToString();
        var requestId = order.PaymentDetailId.ToString();
        var rawSignature = $"accessKey={_momoAccessKey}&orderId={orderIdStr}&partnerCode={_momoPartnerCode}&requestId={requestId}";
        var signature = signSHA256(rawSignature, _momoSecretKey);
        var client = _httpClientFactory.CreateClient();
        var body = JsonSerializer.Serialize(new
        {
            partnerCode = _momoPartnerCode,
            accessKey = _momoAccessKey,
            requestId,
            orderId = orderIdStr,
            requestType = "transactionStatus",
            signature,
        });
        var content = new StringContent(body, Encoding.UTF8, "application/json");
        var response = client.PostAsync(_momoApiEndpoint + "v2/gateway/api/query", content).Result;
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var momoResponse = JsonSerializer.Deserialize<MomoCheckPayResponse>(responseContent);
            switch (momoResponse.resultCode)
            {
                case 0:
                    order.PaymentDetail.Status = PaymentStatus.Success;
                    break;
                case 1000:
                    order.PaymentDetail.Status = PaymentStatus.Pending;
                    break;
                case 1006:
                    order.PaymentDetail.Status = PaymentStatus.Failed;
                    break;
                default:
                    throw new BadRequestException(responseContent);
            }
        }
        else
        {
            throw new BadRequestException(await response.Content.ReadAsStringAsync());
        }
        _context.Orders.Update(order);
        _context.SaveChanges();
        return new PaymentDetail()
        {
            Id = order.PaymentDetail.Id,
            Status = order.PaymentDetail.Status,
        };
    }

    public Task<PaymentDetail> ReCreatePaymentIntentAsync(Order order)
    {
        return this.CreatePaymentIntentAsync(order);
    }

    private class MomoCheckPayResponse
    {
        public string partnerCode { get; set; }
        public string orderId { get; set; }
        public string requestId { get; set; }
        public string extraData { get; set; }
        public int amount { get; set; }
        public long transId { get; set; }
        public string payType { get; set; }
        public int resultCode { get; set; }
        public object[] refundTrans { get; set; }
        public string message { get; set; }
        public long responseTime { get; set; }
        public long lastUpdated { get; set; }
    }
}