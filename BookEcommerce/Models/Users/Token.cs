using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    public class Token
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(1200)]
        public string TokenValue { get; set; } = null!;
        public bool IsRevoked { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
        [MaxLength(500)]
        public string DeviceInfo { get; set; } = null!;
    }
}