using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Attribute;

namespace BookStore.Models
{
    [TimeStamp(deletedAtColumnName: nameof(DeletedAt))]
    public class Address
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]

        public Guid UserId { get; set; }
        [Required]
        [StringLength(50)]
        public string Province { get; set; } = null!;
        [Required]
        [StringLength(50)]
        public string District { get; set; } = null!;
        [Required]
        [StringLength(50)]
        public string Ward { get; set; } = null!;
        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; } = null!;
        [Required]
        [StringLength(50)]
        public string ReceiverName { get; set; } = null!;
        [Required]
        [StringLength(100)]
        public string ParticularAddress { get; set; } = null!;
        public bool IsPrimary { get; set; } = false;
        public User User { get; set; } = null!;
        public DateTime? DeletedAt { get; set; } = null;
    }
    public partial class User
    {
        public User()
        {
            Addresses = new HashSet<Address>();
        }
        public virtual ICollection<Address> Addresses { get; set; }
    }
}