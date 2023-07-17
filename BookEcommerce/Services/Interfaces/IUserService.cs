

using BookStore.Dto;

namespace BookStore.Services.Interfaces;


public interface IUserService
{
    public Task<UserDto> GetUserById(Guid id);
    public Task<UserDto> UpdateUser(UpdateUserDto userDto);
    public Task<bool> ComparePassword(Guid id, string password);
    public Task<bool> ChangePassword(Guid id, string newPassword);
}