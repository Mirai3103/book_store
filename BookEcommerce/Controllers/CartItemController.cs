using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace BookStore.Controllers;
using BookStore.Extensions;
[Route("[controller]")]
[Authorize]
public class CartItemController : ControllerBase
{
    private readonly ICartItemService _cartItemService;
    public CartItemController(ICartItemService cartItemService)
    {
        _cartItemService = cartItemService;
    }
    [HttpGet(Name = "GetCartItems")]
    public IActionResult GetCartItems()
    {
        var cartItems = _cartItemService.GetCartItems(HttpContext.GetUserId());
        return Ok(cartItems);
    }
    [HttpPost(Name = "AddCartItem")]
    public IActionResult AddCartItem([FromBody] AddToCartDto addCartItemDto)
    {
        var cartItem = _cartItemService.AddItemToCart(addCartItemDto, HttpContext.GetUserId());
        return CreatedAtRoute("GetCartItems", new { id = cartItem.CreatedAt }, cartItem);
    }
    [HttpDelete("{id}", Name = "DeleteCartItem")]
    public IActionResult DeleteCartItem(int id)
    {
        bool result = _cartItemService.RemoveItemFromCart(id, HttpContext.GetUserId());
        return Ok(result);
    }
    [HttpDelete(Name = "ClearCart")]
    public IActionResult ClearCart()
    {
        bool result = _cartItemService.ClearCart(HttpContext.GetUserId());
        return Ok(result);
    }
    [HttpPatch("SetCartItemQuantity", Name = "SetCartItemQuantity")]
    public IActionResult SetCartItemQuantity([FromBody] AddToCartDto setCartItemQuantityDto)
    {
        var cartItem = _cartItemService.SetQuantity(setCartItemQuantityDto, HttpContext.GetUserId());
        return Ok(cartItem);
    }
}