﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    public class Publisher
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = null!;

        [MaxLength(255)] public string Description { get; set; } = "";

        public DateTime? DeletedAt { get; set; } = null;
        public virtual ICollection<Book> Books { get; set; } = null!;

    }
}
