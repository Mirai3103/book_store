using System.Dynamic;
using System.Threading;
namespace BookStore.Services.Interfaces;
using BookStore.Models;
using BookStore.Dto;

public interface IPermissionService
{
    Task<ICollection<Permission>> GetPermissionsAsync();
    Task<Permission> GetPermissionAsync(int id);
    Task<ICollection<Permission>> GetPermissionsByRoleIdAsync(int roleId);
    Task<ICollection<Permission>> GetPermissionsByUserIdAsync(Guid userId);
    Task UpdateUserPermissionAsync(UpdateUserPermissionDto updateUserPermissionDto);
}