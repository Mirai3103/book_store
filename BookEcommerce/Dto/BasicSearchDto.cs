namespace BookStore.Dto;

public class BasicSearchDto
{
    public string? keyword { get; set; }
    public int? categoryId { get; set; }
    public int? authorId { get; set; }
    public int? publisherId { get; set; }
    public int? minPrice { get; set; }
    public int? maxPrice { get; set; }
    public int? providerId { get; set; }
    public string sortBy { get; set; } = "Id";
    public bool isAsc { get; set; } = true;
    public int? seriesId { get; set; }

    public BasicSearchDto(string? keyword, int? categoryId, int? authorId, int? publisherId, int? minPrice, int? maxPrice, int? providerId, string sortBy, bool isAsc, int? seriesId)
    {
        this.keyword = keyword;
        this.categoryId = categoryId;
        this.authorId = authorId;
        this.publisherId = publisherId;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.providerId = providerId;
        this.sortBy = sortBy;
        this.isAsc = isAsc;
        this.seriesId = seriesId;
    }

    public BasicSearchDto()
    {
    }
}