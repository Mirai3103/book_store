using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BookStore.Dto
{
    public class CreateRoleDto
    {
        [Required]
        [MaxLength(255)]
        public string Value { get; set; } = null!;
        [MaxLength(255)]
        [Required]

        public string DisplayName { get; set; } = null!;
    }
    public class UpdateRoleDto : CreateRoleDto
    {

        public ICollection<int> RemovedPermissionIds { get; set; } = new List<int>();
        public ICollection<int> AddedPermissionIds { get; set; } = new List<int>();
    }
}