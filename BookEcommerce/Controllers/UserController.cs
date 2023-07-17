using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookStore.Extensions;
namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }
        [HttpGet("MyProfile", Name = "GetUserProfile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var id = HttpContext.GetUserId();
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPatch("{id}", Name = "UpdateUserProfile")]
        public async Task<IActionResult> UpdateUserProfile(Guid id, [FromBody] UpdateUserDto userDto)
        {
            var userId = HttpContext.GetUserId();
            var isHasPermission = HttpContext.IsHasPermission("UpdateUser");
            if (userId != id && !isHasPermission)
            {
                return Forbid();
            }
            userDto.Id = id;
            var user = await _userService.UpdateUser(userDto);
            return Ok(user);
        }
        [HttpPatch("{id}/change-password", Name = "ChangePassword")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] string newPassword)
        {
            var userId = HttpContext.GetUserId();
            var isHasPermission = HttpContext.IsHasPermission("ChangePassword");
            if (userId != id && !isHasPermission)
            {
                return Forbid();
            }
            var isChangePassword = await _userService.ChangePassword(id, newPassword);
            if (!isChangePassword)
            {
                return BadRequest("Change password failed");
            }
            return Ok();
        }
        [HttpPost("/check-password", Name = "CheckPassword")]
        public async Task<IActionResult> CheckPassword([FromBody] string password)
        {
            var userId = HttpContext.GetUserId();
            var isComparePassword = await _userService.ComparePassword(userId, password);
            return Ok(isComparePassword);
        }

    }

}