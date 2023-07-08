
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services.Interfaces
{
    public interface ICartItemService
    {
        public CartItemDto AddItemToCart(AddToCartDto item, Guid userId);
        public CartItemDto SetQuantity(AddToCartDto item, Guid userId);
        public bool RemoveItemFromCart(int bookId, Guid userId);
        public bool ClearCart(Guid userId);
        public IEnumerable<CartItemDto> GetCartItems(Guid userId);
    }
}