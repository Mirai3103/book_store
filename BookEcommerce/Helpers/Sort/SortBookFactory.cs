namespace BookStore.Helpers.Sort;



using BookStore.Extensions;
using BookStore.Models;
using Microsoft.EntityFrameworkCore;

public class SortBookFactory
{
    private static Dictionary<string, ISortBookStrategy> _sortStrategies = new Dictionary<string, ISortBookStrategy>();
    public static ISortBookStrategy createSortStrategy(string sortBy)
    {
        var exists = _sortStrategies.GetValueOrDefault(sortBy);
        if (exists is not null)
        {
            return exists;
        }
        var isColumn = typeof(Book).GetProperty(sortBy) is not null;
        if (isColumn)
        {
            var sortByColumnStrategy = new SortBookByColumn();
            _sortStrategies.Add(sortBy, sortByColumnStrategy);
            return sortByColumnStrategy;
        }
        ISortBookStrategy sortByStrategy;
        switch (sortBy)
        {
            case "BestSelling":
                // var sortByBestSellingStrategy = new SortBookByBestSelling();
                // _sortStrategies.Add(sortBy, sortByBestSellingStrategy);
                // return sortByBestSellingStrategy;
                sortByStrategy = new SortBookByColumn();
                break;
            case "Hot":
                // var sortByHotStrategy = new SortBookByHot();
                // _sortStrategies.Add(sortBy, sortByHotStrategy);
                // return sortByHotStrategy;
                sortByStrategy = new SortBookByColumn();
                break;
            default:
                sortByStrategy = new SortBookByColumn();
                break;
        }
        _sortStrategies.Add(sortBy, sortByStrategy);
        return sortByStrategy;
    }
    public static void RegisterSortStrategy(string sortBy, ISortBookStrategy sortStrategy)
    {
        _sortStrategies.Add(sortBy, sortStrategy);
    }
}
