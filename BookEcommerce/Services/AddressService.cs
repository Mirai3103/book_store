
using System.Net.NetworkInformation;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services;

using BookStore.Exceptions;
using Microsoft.EntityFrameworkCore;
using BookStore.Services.Interfaces;
using System.Threading.Tasks;
using System;

public class AddressService : IAddressService
{
    private readonly BookStoreContext _dbContext;
    public AddressService(BookStoreContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<AddressDto> CreateAddressAsync(AddressDto addressDto)
    {
        var willSetPrimary = addressDto.IsPrimary;
        if (willSetPrimary)
        {
            var listAddress = _dbContext.Addresses.Where(x => x.UserId == addressDto.UserId);
            foreach (var address in listAddress)
            {
                address.IsPrimary = false;
            }
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            var primaryAddress = await this.GetPrimaryAddressAsync(addressDto.UserId);
            if (primaryAddress == null)
            {
                addressDto.IsPrimary = true;
            }
        }
        var newAddress = new Address()
        {
            District = addressDto.District,
            Id = addressDto.Id,
            IsPrimary = willSetPrimary,
            ParticularAddress = addressDto.ParticularAddress,
            PhoneNumber = addressDto.PhoneNumber,
            Province = addressDto.Province,
            ReceiverName = addressDto.ReceiverName,
            UserId = addressDto.UserId,
            Ward = addressDto.Ward,
        };
        await _dbContext.Addresses.AddAsync(newAddress);
        await _dbContext.SaveChangesAsync();
        return newAddress.AsDto();
    }

    public async Task<AddressDto> DeleteAddressAsync(int addressId, Guid userId)
    {
        var address = await _dbContext.Addresses.FirstOrDefaultAsync(x => x.Id == addressId && x.UserId == userId) ?? throw new NotFoundException("Address not found");
        _dbContext.Addresses.Remove(address);
        await _dbContext.SaveChangesAsync();
        return address.AsDto();
    }

    public async Task<AddressDto?> GetAddressByIdAsync(int addressId)
    {
        return await _dbContext.Addresses.Where(x => x.Id == addressId).Select(x => x.AsDto()).FirstOrDefaultAsync();
    }

    public async Task<AddressDto?> GetPrimaryAddressAsync(Guid userId)
    {
        var primaryAddress = await _dbContext.Addresses.Where(x => x.UserId == userId && x.IsPrimary == true).FirstOrDefaultAsync();
        return primaryAddress?.AsDto();
    }

    public async Task<ICollection<AddressDto>> GetUsersAddressesAsync(Guid userId)
    {
        return await _dbContext.Addresses.Where(x => x.UserId == userId).Select(x => x.AsDto()).ToListAsync();
    }

    public async Task<AddressDto> SetPrimaryAddressAsync(int addressId, Guid userId)
    {
        var listAddress = _dbContext.Addresses.Where(x => x.UserId == userId);
        foreach (var address in listAddress)
        {
            address.IsPrimary = false;
        }
        await _dbContext.SaveChangesAsync();
        var primaryAddress = await _dbContext.Addresses.Where(x => x.Id == addressId && x.UserId == userId).FirstOrDefaultAsync() ?? throw new NotFoundException("Address not found");
        primaryAddress.IsPrimary = true;
        await _dbContext.SaveChangesAsync();
        return primaryAddress.AsDto();
    }

    public Task<AddressDto> UpdateAddressAsync(AddressDto addressDto)
    {
        var address = _dbContext.Addresses.Where(x => x.Id == addressDto.Id && x.UserId == addressDto.UserId).FirstOrDefault() ?? throw new NotFoundException("Address not found");
        address.District = addressDto.District;
        address.ParticularAddress = addressDto.ParticularAddress;
        address.PhoneNumber = addressDto.PhoneNumber;
        address.Province = addressDto.Province;
        address.ReceiverName = addressDto.ReceiverName;
        address.Ward = addressDto.Ward;
        _dbContext.SaveChanges();
        return Task.FromResult(address.AsDto());

    }
}