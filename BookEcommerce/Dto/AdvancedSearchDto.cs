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
public record class AdvancedSearchDto(
   string? keyword,
    int? categoryId,
    int? authorId,
    int? publisherId,
    int? minPrice,
    int? maxPrice,
    int? providerId,
    BookSortType sort = BookSortType.Newest
)
{


}