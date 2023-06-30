using BookStore.Data;
using BookStore.Dto;
using BookStore.Extensions;
using BookStore.Models;
using BookStore.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Services
{

    public class PermissionService : IPermissionService
    {
        private readonly BookStoreContext _context;

        public PermissionService(BookStoreContext context)
        {
            _context = context;
        }
        public Task<Permission?> GetPermissionAsync(int id)
        {
            return Task.FromResult(_context.Permissions.Find(id));
        }

        public Task<ICollection<Permission>> GetPermissionsAsync()
        {
            return Task.FromResult<ICollection<Permission>>(_context.Permissions.ToList());
        }

        public Task<ICollection<Permission>> GetPermissionsByRoleIdAsync(int roleId)
        {
            var role = _context.Roles.Include(r => r.Permissions).FirstOrDefault(r => r.Id == roleId);
            if (role == null)
            {
                return Task.FromResult<ICollection<Permission>>(new List<Permission>());
            }

            var result = role.Permissions.Select(p => p.SelectPreview()).ToList();

            return Task.FromResult<ICollection<Permission>>(result);

        }

        public Task<ICollection<Permission>> GetPermissionsByUserIdAsync(Guid userId)
        {
            var user = _context.Users.Include(u => u.Permissions).FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return Task.FromResult<ICollection<Permission>>(new List<Permission>());
            }
            return Task.FromResult<ICollection<Permission>>(user.Permissions.Select(p => p.SelectPreview()).ToList());

        }

        public Task UpdateUserPermissionAsync(UpdateUserPermissionDto updateUserPermissionDto)
        {
            var user = _context.Users
                .Include(u => u.Permissions)
                .FirstOrDefault(u => u.Id == updateUserPermissionDto.UserId);
            if (user == null)
            {
                return Task.CompletedTask;
            }
            var deletedPermissions = user.Permissions.Where(p => updateUserPermissionDto.RemovedPermissionIds.Contains(p.Id)).ToList();
            foreach (var permission in deletedPermissions)
            {
                user.Permissions.Remove(permission);
            }
            var addedPermissions = _context.Permissions.Where(p => updateUserPermissionDto.AddedPermissionIds.Contains(p.Id)).ToList();
            foreach (var permission in addedPermissions)
            {
                user.Permissions.Add(permission);
            }
            _context.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
