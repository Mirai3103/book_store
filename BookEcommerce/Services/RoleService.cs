using BookStore.Data;
using BookStore.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Services;

using BookStore.Dto;
using BookStore.Models;
using BookStore.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class RoleService : IRoleService
{
    private readonly BookStoreContext _context;

    public RoleService(BookStoreContext context)
    {
        _context = context;
    }

    public async Task<Role> CreateRoleAsync(CreateRoleDto roleDto)
    {
        var newRole = new Role
        {
            DisplayName = roleDto.DisplayName,
            Value = roleDto.Value,
        };
        await _context.Roles.AddAsync(newRole);
        await _context.SaveChangesAsync();
        return newRole;
    }

    public Task<bool> DeleteRoleAsync(int id)
    {
        var role = _context.Roles.Find(id);
        if (role == null)
        {
            return Task.FromResult(false);
        }
        _context.Roles.Remove(role);
        _context.SaveChanges();
        return Task.FromResult(true);
    }

    public async Task<Role?> GetRoleAsync(int id)
    {
        return await _context.Roles.FindAsync(id);
    }

    public async Task<ICollection<Role>> GetRolesAsync()
    {
        return await _context.Roles.ToListAsync();
    }

    public Task<ICollection<Role>> GetRolesByUserIdAsync(Guid userId)
    {
        var user = _context.Users.Include(u => u.Roles).FirstOrDefault(u => u.Id == userId);
        if (user == null)
        {
            return Task.FromResult<ICollection<Role>>(new List<Role>());
        }
        return Task.FromResult(user.Roles);
    }

    public Task<Role> UpdateRoleAsync(int id, UpdateRoleDto roleDto)
    {

        var role = _context.Roles
            .Include(r => r.Permissions)
            .FirstOrDefault(r => r.Id == id);
        if (role == null)
        {
            throw new NotFoundException("Role not found");
        }
        var willDeletePer = _context.Permissions.Where(p => roleDto.RemovedPermissionIds.Contains(p.Id));
        var willAddPer = _context.Permissions.Where(p => roleDto.AddedPermissionIds.Contains(p.Id));
        foreach (var per in willDeletePer)
        {
            role.Permissions.Remove(per);
        }

        foreach (var per in willAddPer)
        {
            role.Permissions.Add(per);
        }
        role.DisplayName = roleDto.DisplayName;
        role.Value = roleDto.Value;
        _context.Roles.Update(role);
        _context.SaveChanges();
        return Task.FromResult(role);

    }
}