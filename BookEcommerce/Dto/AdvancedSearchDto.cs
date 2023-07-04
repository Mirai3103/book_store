namespace BookStore.Dto;
using BookStore.Models;


public class AdvancedSearchDto
{
    public string? keyword { get; set; }
    public ICollection<int>? categoryIds { get; set; }
    public ICollection<int>? authorIds { get; set; }
    public ICollection<int>? publisherIds { get; set; }
    public int? minPrice { get; set; }
    public int? maxPrice { get; set; }
    public ICollection<int>? providerIds { get; set; }
    public string sortBy { get; set; } = "Id";
    public bool isAsc { get; set; } = true;
    public ICollection<int>? seriesIds { get; set; }


    public AdvancedSearchDto()
    {
    }
}