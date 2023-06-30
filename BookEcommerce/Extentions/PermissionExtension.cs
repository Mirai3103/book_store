using BookStore.Models;

namespace BookStore.Extensions;

public static class PermissionExtension
{
    public static Permission SelectPreview(this Permission permission)
    {
        return new Permission()
        {
            Id = permission.Id,
            DisplayName = permission.DisplayName,
            Value = permission.Value
        };
    }
}