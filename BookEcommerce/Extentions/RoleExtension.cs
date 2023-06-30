using BookStore.Models;

namespace BookStore.Extentions
{
    public static class RoleExtension
    {
        public static Role SelectPreview(this Role role)
        {
            return new Role()
            {
                Id = role.Id,
                DisplayName = role.DisplayName,
                Value = role.Value
            };
        }
    }
}
