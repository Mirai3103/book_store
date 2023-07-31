namespace BookStore.Services.Interfaces;
using BookStore.Dto;

public interface IAddressService
{
    public Task<AddressDto> CreateAddressAsync(AddressDto addressDto);
    public Task<AddressDto> UpdateAddressAsync(AddressDto addressDto);
    public Task<ICollection<AddressDto>> GetUsersAddressesAsync(Guid userId);
    public Task<AddressDto?> GetAddressByIdAsync(int addressId);
    public Task<AddressDto> DeleteAddressAsync(int addressId, Guid userId);
    public Task<AddressDto> SetPrimaryAddressAsync(int addressId, Guid userId);
    public Task<AddressDto?> GetPrimaryAddressAsync(Guid userId);


}