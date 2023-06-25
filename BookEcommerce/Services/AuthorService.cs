

using BookStore.Data;
using BookStore.Dto;
using BookStore.Models;

namespace BookStore.Services;

using BookStore.Exceptions;
using BookStore.Extensions;
using Microsoft.EntityFrameworkCore;
using BookStore.Services.Interfaces;

public class AuthorService : IAuthorService
{
    private readonly BookStoreContext _dbContext;
    public AuthorService(BookStoreContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<AuthorDto> CreateAuthorAsync(AuthorDto authorDto)
    {
        var author = new Author
        {
            Name = authorDto.Name,
            Description = authorDto.Description,
            DeletedAt = null
        };
        _dbContext.Authors.Add(author);
        await _dbContext.SaveChangesAsync();
        return author.SelectPreview()!;
    }

    public async Task DeleteAuthorAsync(int id)
    {
        _dbContext.Authors.Remove(_dbContext.Authors.Find(id));
        await _dbContext.SaveChangesAsync();
    }

    public async Task<AuthorDto?> GetAuthorDetailAsync(int id)
    {
        var author = await _dbContext.Authors
        .Where(a => a.Id == id).Select(a => new AuthorDto()
        {
            Id = a.Id,
            Description = a.Description,
            Name = a.Name,
            TotalBooks = a.Books.Count()
        }).FirstOrDefaultAsync();
        return author;
    }

    public Task<PaginationDto<AuthorDto>> GetAuthorsPreviewAsync(int page, int limit, string? search = null, string? orderBy = null, bool isAscending = true)
    {
        var authors = _dbContext.Authors
        .Where(a => search == null || a.Name.ContainIgnoreAll(search))
        .Select(a => new
        AuthorDto()
        {
            Id = a.Id,
            Name = a.Name,
            TotalBooks = _dbContext.Books.Count(b => b.AuthorId == a.Id),
        }
        );
        if (isAscending)
        {
            authors = authors.OrderBy(a => EF.Property<object>(a, orderBy ?? "Id"));
        }
        else
        {
            authors = authors.OrderByDescending(a => EF.Property<object>(a, orderBy ?? "Id"));
        }
        var result = authors.ToPagination(page, limit);
        return Task.FromResult(result);
    }

    public async Task<AuthorDto> UpdateAuthorAsync(int id, AuthorDto authorDto)
    {
        var author = await _dbContext.Authors.FindAsync(id);
        if (author is null)
        {
            throw new NotFoundException("Không tìm thấy tác giả");
        }
        author.Name = authorDto.Name;
        author.Description = authorDto.Description;
        _dbContext.Authors.Update(author);
        await _dbContext.SaveChangesAsync();
        return author.SelectPreview()!;
    }
}