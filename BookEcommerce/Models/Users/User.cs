using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    public enum Gender
    {
        MALE,
        FEMALE,
        UNKNOWN,
    }
    public partial class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = null!;
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
        [DataType(DataType.PhoneNumber)]
        public string? PhoneNumber { get; set; } = null!;
        [MaxLength(255)]
        public string? AvatarUrl { get; set; }

        public Gender Gender { get; set; } = Gender.UNKNOWN;
        [DataType(DataType.Date)]
        public DateOnly? Birthday { get; set; }

        public bool IsValidateEmail { get; set; } = false;
        public bool IsValidatePhoneNumber { get; set; } = false;
        [DataType(DataType.DateTime)]
        public string DisplayName { get; set; } = null!;
        public virtual ICollection<Role> Roles { get; set; } = new HashSet<Role>();
        public virtual ICollection<Permission> Permissions { get; set; } = new HashSet<Permission>();
        public virtual ICollection<Token> Tokens { get; set; } = new HashSet<Token>();
    }
}