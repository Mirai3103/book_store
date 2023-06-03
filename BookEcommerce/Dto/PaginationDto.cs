namespace BookStore.Dto;

public record class PaginationDto<T>(
    IEnumerable<T> Items,
    int TotalItems,
    int CurrentPage,
    int TotalPages,
    int PageSize
);