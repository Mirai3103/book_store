namespace BookStore.Services.Interfaces;

using BookStore.Dto;
using BookStore.Models;
public interface IBookImageService
{
    Task<ICollection<string>> CreateBookImageAsync(int id, IFormFileCollection images);
    Task UpdateBookImageAsync(int id, UpdateBookImageDto updateBookImageDto);

}