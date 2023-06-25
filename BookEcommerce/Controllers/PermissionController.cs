
using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("controller")]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _permissionService;
        public PermissionController(IPermissionService permissionService)
        {
            this._permissionService = permissionService;
        }
        [HttpGet(Name = "GetPermissions")]
        public async Task<IActionResult> GetPermissions()
        {
            var permissions = await _permissionService.GetPermissionsAsync();
            return Ok(permissions);
        }
        [HttpGet("{id}", Name = "GetPermissionDetail")]
        public async Task<IActionResult> GetPermissionDetail(int id)
        {
            var permission = await _permissionService.GetPermissionAsync(id);
            if (permission == null)
            {
                return NotFound();
            }
            return Ok(permission);
        }
        [HttpGet("role/{roleId}", Name = "GetPermissionsByRoleId")]
        public async Task<IActionResult> GetPermissionsByRoleId(int roleId)
        {
            var permissions = await _permissionService.GetPermissionsByRoleIdAsync(roleId);
            return Ok(permissions);
        }
        [HttpGet("user/{userId}", Name = "GetPermissionsByUserId")]
        public async Task<IActionResult> GetPermissionsByUserId(Guid userId)
        {
            var permissions = await _permissionService.GetPermissionsByUserIdAsync(userId);
            return Ok(permissions);
        }
        [HttpPut("user", Name = "UpdateUserPermission")]
        public async Task<IActionResult> UpdateUserPermission([FromBody] UpdateUserPermissionDto updateUserPermissionDto)
        {
            await _permissionService.UpdateUserPermissionAsync(updateUserPermissionDto);
            return NoContent();
        }
    }
}