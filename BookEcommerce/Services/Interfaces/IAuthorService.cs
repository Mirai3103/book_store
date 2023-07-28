namespace BookStore.Services.Interfaces;
using BookStore.Dto;

public interface IAuthorService
{
    Task<PaginationDto<AuthorDto>> GetAuthorsPreviewAsync(int page, int limit, string? search = null, string? orderBy = null, bool isAscending = true);
    Task<AuthorDto?> GetAuthorDetailAsync(int id);
    Task<AuthorDto> CreateAuthorAsync(AuthorDto authorDto);
    Task DeleteAuthorAsync(int id);
    Task<AuthorDto> UpdateAuthorAsync(int id, AuthorDto authorDto);
    Task<ICollection<AuthorDto>> GetAuthorsPreviewAsync(int[] ids);
}
