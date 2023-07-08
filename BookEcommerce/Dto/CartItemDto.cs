namespace BookStore.Dto;
using BookStore.Models;
using BookStore.Extensions;
public class AddToCartDto
{
    public int BookId { get; set; }
    public int Quantity { get; set; }
}

public class CartItemDto
{
    public Guid UserId { get; set; }
    public int BookId { get; set; }
    public int Quantity { get; set; }
    public BookPreviewDto Book { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
public static class CartItemExtensions
{
    public static CartItemDto AsDto(this CartItem cartItem)
    {
        return new CartItemDto
        {
            UserId = cartItem.UserId,
            BookId = cartItem.BookId,
            Quantity = cartItem.Quantity,
            Book = cartItem.Book.SelectPreview(),
            CreatedAt = cartItem.CreatedAt,
            UpdatedAt = cartItem.UpdatedAt,
        };
    }
}