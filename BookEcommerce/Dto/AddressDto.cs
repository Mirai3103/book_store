namespace BookStore.Dto;

using System.ComponentModel.DataAnnotations;
using BookStore.Models;
public class AddressDto
{

    public int Id { get; set; }

    public Guid UserId { get; set; }
    [Required]

    public string Province { get; set; } = null!;
    [Required]


    public string District { get; set; } = null!;
    [Required]


    public string Ward { get; set; } = null!;
    [Required]

    public string PhoneNumber { get; set; } = null!;
    [Required]

    public string ReceiverName { get; set; } = null!;
    [Required]

    public string ParticularAddress { get; set; } = null!;
    public bool IsPrimary { get; set; } = false;
    public UserDto? User { get; set; }
}

public static class AddressExtension
{
    public static AddressDto AsDto(this Address address)
    {
        return new AddressDto
        {
            Id = address.Id,
            UserId = address.UserId,
            Province = address.Province,
            District = address.District,
            Ward = address.Ward,
            PhoneNumber = address.PhoneNumber,
            ReceiverName = address.ReceiverName,
            ParticularAddress = address.ParticularAddress,
            IsPrimary = address.IsPrimary,
            User = address.User?.AsDto()
        };
    }
}