using BookStore.Data;
using BookStore.Models;

namespace BookStore.Services.Checkout;


public class CheckoutStrategyFactory
{
    private readonly BookStoreContext _context;
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;
    public CheckoutStrategyFactory(BookStoreContext context, IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public ICheckoutStrategy GetCheckoutStrategy(PaymentProvider paymentProvider)
    {
        ICheckoutStrategy strategy = paymentProvider switch
        {
            PaymentProvider.COD => new CODStrategy(_context),
            PaymentProvider.Momo => new MomoStrategy(_context, _configuration, _httpClientFactory),
            _ => throw new ArgumentException("Invalid payment provider"),
        };
        return strategy ?? throw new ArgumentException("Invalid payment provider");
    }

}