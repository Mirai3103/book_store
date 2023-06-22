using BookStore.Services.Interfaces;
using BookStore.Exceptions;
namespace BookStore.Services;


public class FileService : IFileService
{
    private readonly string _uploadPath = "uploads";
    public FileService()
    {
        if (!Directory.Exists(_uploadPath))
        {
            Directory.CreateDirectory(_uploadPath);
        }
    }

    public Task DeleteFileAsync(string fileName)
    {
        var filePath = Path.Combine(_uploadPath, fileName);
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }

        return Task.CompletedTask;

    }

    public Task DeleteFilesAsync(ICollection<string> fileNames)
    {
        var filePaths = fileNames.Select(fileName => Path.Combine(_uploadPath, fileName));
        foreach (var filePath in filePaths)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        return Task.CompletedTask;
    }

    public Stream GetFile(string fileName)
    {
        var filePath = Path.Combine(_uploadPath, fileName);
        if (!File.Exists(filePath))
        {
            throw new NotFoundException("File not found");
        }
        var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        return fileStream;
    }

    public string SaveFile(IFormFile file)
    {
        throw new NotImplementedException();
    }

    public async Task<string> SaveFileAsync(IFormFile file)
    {
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(_uploadPath, fileName);

        using var fileStream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(fileStream);
        return fileName;
    }

    public ICollection<string> SaveFiles(IFormFileCollection files)
    {
        throw new NotImplementedException();
    }

    public async Task<ICollection<string>> SaveFilesAsync(IFormFileCollection files)
    {
        var filesUrl = files.Select(async file => await SaveFileAsync(file));
        var result = await Task.WhenAll(filesUrl);

        return result;
    }


}