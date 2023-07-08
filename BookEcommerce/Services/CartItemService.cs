namespace BookStore.Services;

using System.Threading.Tasks;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Exceptions;
using BookStore.Extensions;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class CartItemService : ICartItemService
{
    private readonly BookStoreContext _context;
    public CartItemService(BookStoreContext context)
    {
        _context = context;
    }
    public CartItemDto AddItemToCart(AddToCartDto item, Guid userId)
    {
        var book = _context.Books.FirstOrDefault(b => b.Id == item.BookId);
        if (book == null)
        {
            throw new NotFoundException("Book not found");
        }
        if (item.Quantity > book.Stock)
        {
            throw new BadRequestException("Not enough books in stock");
        }
        var cartItem = _context.CartItems.FirstOrDefault(ci => ci.BookId == item.BookId && ci.UserId == userId);
        if (cartItem == null)
        {
            cartItem = new CartItem
            {
                BookId = item.BookId,
                UserId = userId,
                Quantity = item.Quantity,
            };
            book.Stock -= item.Quantity;
            _context.CartItems.Add(cartItem);
            _context.SaveChanges();
            return cartItem.AsDto();
        }
        if (cartItem.Quantity + item.Quantity > book.Stock)
        {
            throw new BadRequestException("Not enough books in stock");
        }
        cartItem.Quantity += item.Quantity;
        book.Stock -= item.Quantity;
        _context.SaveChanges();
        return cartItem.AsDto();

    }
    public CartItemDto SetQuantity(AddToCartDto item, Guid userId)
    {
        var itemToUpdate = _context.CartItems
        .Include(ci => ci.Book)
        .FirstOrDefault(ci => ci.BookId == item.BookId && ci.UserId == userId);
        if (itemToUpdate == null)
        {
            throw new NotFoundException("Item not found");
        }

        var changeAmount = item.Quantity - itemToUpdate.Quantity;
        if (changeAmount > itemToUpdate.Book.Stock)
        {
            throw new BadRequestException("Not enough books in stock");
        }
        itemToUpdate.Book.Stock -= changeAmount;
        itemToUpdate.Quantity = item.Quantity;
        _context.SaveChanges();
        return itemToUpdate.AsDto();

    }
    public bool RemoveItemFromCart(int bookId, Guid userId)
    {
        var itemToRemove = _context.CartItems.FirstOrDefault(ci => ci.BookId == bookId && ci.UserId == userId);
        if (itemToRemove == null)
        {
            return false;
        }
        _context.CartItems.Remove(itemToRemove);
        _context.SaveChanges();
        return true;
    }
    public bool ClearCart(Guid userId)
    {
        var itemsToRemove = _context.CartItems.Where(ci => ci.UserId == userId);
        _context.CartItems.RemoveRange(itemsToRemove);
        _context.SaveChanges();
        return true;
    }
    public IEnumerable<CartItemDto> GetCartItems(Guid userId)
    {
        var cartItems = _context.CartItems
        .Include(ci => ci.Book)
        .Where(ci => ci.UserId == userId)
        .OrderByDescending(ci => ci.CreatedAt)
        .Select(ci => ci.AsDto());

        return cartItems;
    }
}