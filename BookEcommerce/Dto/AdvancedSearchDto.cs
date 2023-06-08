namespace BookStore.Dto;
using BookStore.Models;

public enum BookSortType
{
    WeekBestSeller,
    MonthBestSeller,
    YearBestSeller,
    Newest,
    Oldest,
    PriceAsc,
    PriceDesc,
}

public class AdvancedSearchDto
{
    public string? keyword { get; set; }
    public int? categoryId { get; set; }
    public int? authorId { get; set; }
    public int? publisherId { get; set; }
    public int? minPrice { get; set; }
    public int? maxPrice { get; set; }
    public int? providerId { get; set; }
    public BookSortType sort { get; set; } = BookSortType.Newest;

    public AdvancedSearchDto(string? keyword, int? categoryId, int? authorId, int? publisherId, int? minPrice, int? maxPrice, int? providerId, BookSortType sort)
    {
        this.keyword = keyword;
        this.categoryId = categoryId;
        this.authorId = authorId;
        this.publisherId = publisherId;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.providerId = providerId;
        this.sort = sort;
    }

    public AdvancedSearchDto()
    {
    }
}