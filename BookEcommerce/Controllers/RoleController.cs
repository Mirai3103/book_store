
using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    [Route("controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            this._roleService = roleService;
        }
        [HttpGet(Name = "GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(roles);
        }
        [HttpPost(Name = "CreateRole")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto roleDto)
        {
            var role = await _roleService.CreateRoleAsync(roleDto);
            return CreatedAtRoute("GetRoleDetail", new { id = role.Id }, role);
        }
        [HttpPut("{id}", Name = "UpdateRole")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] UpdateRoleDto roleDto)
        {
            var role = await _roleService.UpdateRoleAsync(id, roleDto);
            return Ok(role);
        }
        [HttpDelete("{id}", Name = "DeleteRole")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            await _roleService.DeleteRoleAsync(id);
            return NoContent();
        }
        [HttpGet("{id}", Name = "GetRoleDetail")]
        public async Task<IActionResult> GetRoleDetail(int id)
        {
            var role = await _roleService.GetRoleAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }
    }

}