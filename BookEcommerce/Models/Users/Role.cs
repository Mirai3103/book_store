using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    public class Role
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(255)]
        [Required]
        public string Value { get; set; } = null!;
        [MaxLength(255)]
        public string DisplayName { get; set; } = null!;
        public virtual ICollection<Permission> Permissions { get; set; } = null!;
        public virtual ICollection<User> Users { get; set; } = null!;
    }

}