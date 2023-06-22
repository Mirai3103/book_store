namespace BookStore.Services;
using BookStore.Data;
using BookStore.Dto;
using BookStore.Services.Interfaces;
using BookStore.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

public class BookImageService : IBookImageService
{
    private readonly BookStoreContext _context;
    private readonly IFileService _fileService;
    public BookImageService(BookStoreContext context, IFileService fileService)
    {
        _context = context;
        _fileService = fileService;
    }

    public async Task<ICollection<string>> CreateBookImageAsync(int id, IFormFileCollection images)
    {
        var bookImagesUrl = await _fileService.SaveFilesAsync(images);
        var bookImages = bookImagesUrl.Select(bi => new BookImage()
        {
            BookId = id,
            Url = bi,
        });
        await _context.BookImages.AddRangeAsync(bookImages);
        await _context.SaveChangesAsync();
        return bookImagesUrl;
    }
    public async Task UpdateBookImageAsync(int id, UpdateBookImageDto updateBookImageDto)
    {
        var listImg = _context.BookImages.Where(bi => updateBookImageDto.DeleteImages.Contains(bi.Url));
        _context.RemoveRange(
              listImg
          );
        _context.BookImages.RemoveRange(listImg);
        var _ = _fileService.DeleteFilesAsync(updateBookImageDto.DeleteImages);
        if (updateBookImageDto.Images != null)
        {
            var bookImagesUrl = await this.CreateBookImageAsync(id, updateBookImageDto.Images);
        }
        await _context.SaveChangesAsync();

    }

}