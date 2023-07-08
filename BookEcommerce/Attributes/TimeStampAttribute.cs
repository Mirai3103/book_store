

using System.Reflection;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BookStore.Attribute;
[System.AttributeUsage(System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
public class TimeStampAttribute : System.Attribute
{

    readonly string? deletedAtColumnName;
    readonly string? createdAtColumnName;
    readonly string? updatedAtColumnName;
    public TimeStampAttribute(string? deletedAtColumnName = null, string? createdAtColumnName = null, string? updatedAtColumnName = null)
    {
        this.deletedAtColumnName = deletedAtColumnName;
        this.createdAtColumnName = createdAtColumnName;
        this.updatedAtColumnName = updatedAtColumnName;
    }

    public string? DeletedAtColumnName => deletedAtColumnName;
    public string? CreatedAtColumnName => createdAtColumnName;
    public string? UpdatedAtColumnName => updatedAtColumnName;

}
public static class TimeStampExtension
{
    public static string? GetDeletedAtColumnName(this EntityEntry entityEntry)
    {
        TimeStampAttribute? timeStampAttribute = entityEntry.Entity.GetType().GetCustomAttribute<TimeStampAttribute>();
        if (timeStampAttribute != null)
        {
            return timeStampAttribute.DeletedAtColumnName;
        }
        return null;
    }
    public static string? GetCreatedAtColumnName(this EntityEntry entityEntry)
    {
        TimeStampAttribute? timeStampAttribute = entityEntry.Entity.GetType().GetCustomAttribute<TimeStampAttribute>();
        if (timeStampAttribute != null)
        {
            return timeStampAttribute.CreatedAtColumnName;
        }
        return null;
    }
    public static string? GetUpdatedAtColumnName(this EntityEntry entityEntry)
    {
        TimeStampAttribute? timeStampAttribute = entityEntry.Entity.GetType().GetCustomAttribute<TimeStampAttribute>();
        if (timeStampAttribute != null)
        {
            return timeStampAttribute.UpdatedAtColumnName;
        }
        return null;
    }
}