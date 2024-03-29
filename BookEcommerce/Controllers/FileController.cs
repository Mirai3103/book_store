
using BookStore.Controllers;
using BookStore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class FileController : ControllerBase
{
    private readonly IFileService _fileService;
    public FileController(IFileService fileService)
    {
        _fileService = fileService;
    }
    [HttpGet("{fileName}", Name = "GetFile")]
    public FileStreamResult GetFile(string fileName)
    {
        var fileStream = _fileService.GetFile(fileName);

        return new FileStreamResult(fileStream, "application/octet-stream");
    }
    [HttpPost("upload", Name = "UploadFile")]
    public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
    {
        var fileName = await _fileService.SaveFileAsync(file);
        return Ok(fileName);
    }
}