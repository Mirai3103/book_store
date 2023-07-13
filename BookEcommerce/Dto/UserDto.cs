

using BookStore.Models;

namespace BookStore.Dto;

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Gender { get; set; }
    public DateOnly? Birthday { get; set; }
    public bool IsValidateEmail { get; set; } = false;
}


public class UpdateUserDto
{

    public Guid Id { get; set; }
    public string? Email { get; set; }
    public string? DisplayName { get; set; }
    public string? AvatarUrl { get; set; }
    public string? PhoneNumber { get; set; }
    public Gender? Gender { get; set; }
    public DateOnly? Birthday { get; set; }
}


public static class UserExtension
{
    public static UserDto AsDto(this User user)
    {
        return new UserDto()
        {
            AvatarUrl = user.AvatarUrl,
            Birthday = user.Birthday,
            DisplayName = user.DisplayName,
            Email = user.Email,
            Id = user.Id,
            IsValidateEmail = user.IsValidateEmail,
            PhoneNumber = user.PhoneNumber,
            Gender = user.Gender.ToString(),
        };
    }
}