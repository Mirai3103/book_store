using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BookStore.Controllers;

[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;

    public AuthController(ILogger<AuthController> logger, IAuthService authService)
    {
        _logger = logger;
        _authService = authService;
    }
    [HttpGet("create-access-token")]
    public IActionResult CreateAccessToken([FromQuery] string userId, [FromQuery] int expiresInMinutes = 60)
    {
        var result = _authService.CreateAccessToken(userId, expiresInMinutes);
        if (result == null)
        {
            return BadRequest();
        }
        return Ok(result);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // get ip address of request


        var result = await _authService.Login(request, this.HttpContext);
        if (result == null)
        {
            return BadRequest(new
            {
                message = "Username or password is incorrect"
            });
        }

        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var result = await _authService.Register(request, this.HttpContext);
        if (result == null)
        {
            return Unauthorized(new
            {
                message = "Username or password is incorrect"
            });
        }
        return Ok(result);
    }
    [HttpGet("validate-email")]
    public async Task<IActionResult> ValidateEmail([FromQuery] string token)
    {
        var result = await _authService.ValidateEmail(token);
        if (result == null)
        {
            return BadRequest(new
            {
                message = result
            });
        }
        return Ok(result);
    }
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest refreshToken)
    {
        var result = await _authService.RefreshToken(refreshToken.RefreshToken, this.HttpContext);
        if (result == null)
        {
            return BadRequest(new
            {
                message = "Refresh token is incorrect"
            });
        }
        return Ok(result);
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenRequest refreshToken)
    {
        await _authService.Logout(refreshToken.RefreshToken, this.HttpContext);
        return Ok();
    }
    [HttpGet("send-verify-email")]
    public async Task<IActionResult> SendVerifyEmail([FromQuery] Guid userId)
    {
        var currentDomain = $"{this.Request.Scheme}://{this.Request.Host}";
        var result = await _authService.SendVerificationEmail(userId, currentDomain);
        return Ok(result);
    }
}