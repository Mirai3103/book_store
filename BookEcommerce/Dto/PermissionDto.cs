

namespace BookStore.Dto
{
    public class UpdateUserPermissionDto
    {
        public ICollection<int> AddedPermissionIds { get; set; } = new List<int>();
        public ICollection<int> RemovedPermissionIds { get; set; } = new List<int>();
        public Guid UserId { get; set; }
    }
}