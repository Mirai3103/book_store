

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services;
using BookStore.Services.Interfaces;
using BookStore.Utils;
using System.Threading.Tasks;
using BookStore.Exceptions;
using BookStore.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

public class UserService : IUserService
{
    private readonly BookStoreContext _dbContext;
    public UserService(BookStoreContext dbContext)
    {
        _dbContext = dbContext;
    }
    public Task<bool> ChangePassword(Guid id, string newPassword)
    {
        var user = _dbContext.Users.Find(id);
        if (user is null)
        {
            return Task.FromResult(false);
        }
        user.Password = newPassword;
        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
        return Task.FromResult(true);
    }

    public Task<bool> ComparePassword(Guid id, string password)
    {
        var user = _dbContext.Users.Find(id);
        if (user is null)
        {
            return Task.FromResult(false);
        }
        return Task.FromResult(user.Password == password);
    }

    public Task<UserDto> GetUserById(Guid id)
    {
        var user = _dbContext.Users.Find(id) ?? throw new NotFoundException("Không tìm thấy người dùng");
        return Task.FromResult(user.AsDto());
    }

    public Task<UserDto> UpdateUser(UpdateUserDto userDto)
    {
        var user = _dbContext.Users.Find(userDto.Id) ?? throw new NotFoundException("Không tìm thấy người dùng");
        user.AvatarUrl = userDto.AvatarUrl ?? user.AvatarUrl;
        user.Email = userDto.Email ?? user.Email;
        user.DisplayName = userDto.DisplayName ?? user.DisplayName;
        user.PhoneNumber = userDto.PhoneNumber ?? user.PhoneNumber;
        user.Birthday = userDto.Birthday ?? user.Birthday;
        user.AvatarUrl = userDto.AvatarUrl ?? user.AvatarUrl;
        user.Gender = userDto.Gender ?? user.Gender;
        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
        return Task.FromResult(user.AsDto());
    }
}