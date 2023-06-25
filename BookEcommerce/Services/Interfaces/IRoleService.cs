using System.Dynamic;
using System.Threading;
namespace BookStore.Services.Interfaces;
using BookStore.Models;
using BookStore.Dto;

public interface IRoleService
{
    Task<ICollection<Role>> GetRolesAsync();
    Task<Role> GetRoleAsync(int id);
    Task<Role> CreateRoleAsync(CreateRoleDto roleDto);
    Task<Role> UpdateRoleAsync(int id, UpdateRoleDto roleDto);
    Task<bool> DeleteRoleAsync(int id);
    Task<ICollection<Role>> GetRolesByUserIdAsync(Guid userId);
}