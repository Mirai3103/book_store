using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers;

[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;

    public AuthController(ILogger<AuthController> logger, IAuthService authService)
    {
        _logger = logger;
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.Login(request);
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
        var result = await _authService.Register(request);
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
}