using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookStore.Extensions;

namespace BookStore.Controllers;

[Route("[controller]")]
[Authorize]
public class AddressController : ControllerBase
{
    private readonly IAddressService _addressService;

    public AddressController(IAddressService addressService)
    {
        _addressService = addressService;
    }
    [HttpPost]
    public async Task<IActionResult> CreateAddress([FromBody] AddressDto addressDto)
    {
        var userId = HttpContext.GetUserId();
        addressDto.UserId = userId;
        var result = await _addressService.CreateAddressAsync(addressDto);
        return Ok(result);
    }
    [HttpPut]
    public async Task<IActionResult> UpdateAddress([FromBody] AddressDto addressDto)
    {
        var userId = HttpContext.GetUserId();
        addressDto.UserId = userId;
        var result = await _addressService.UpdateAddressAsync(addressDto);
        return Ok(result);
    }
    [HttpGet("my-addresses")]
    public async Task<IActionResult> GetUsersAddresses()
    {
        var userId = HttpContext.GetUserId();
        var result = await _addressService.GetUsersAddressesAsync(userId);
        return Ok(result);
    }

    [HttpGet("{addressId}")]
    public async Task<IActionResult> GetAddressById(int addressId)
    {
        var result = await _addressService.GetAddressByIdAsync(addressId);
        return Ok(result);
    }
    [HttpDelete("{addressId}")]
    public async Task<IActionResult> DeleteAddress(int addressId)
    {
        var userId = HttpContext.GetUserId();
        var result = await _addressService.DeleteAddressAsync(addressId, userId);
        return Ok(result);
    }
    [HttpPatch("set-primary/{addressId}")]
    public async Task<IActionResult> SetPrimaryAddress(int addressId)
    {
        var userId = HttpContext.GetUserId();
        var result = await _addressService.SetPrimaryAddressAsync(addressId, userId);
        return Ok(result);
    }
    [HttpGet("primary-address")]
    public async Task<IActionResult> GetPrimaryAddress()
    {
        var userId = HttpContext.GetUserId();
        var result = await _addressService.GetPrimaryAddressAsync(userId);
        return Ok(result);
    }
}