namespace BookStore.Dto;

public class OrderByDto
{
    public string OrderBy { get; set; } = "Id";
    public bool IsAscending { get; set; }
}
