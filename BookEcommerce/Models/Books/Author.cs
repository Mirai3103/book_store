﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models
{
    public class Author
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = null!;

        [MaxLength(255)]
        public string Description { get; set; } = "";

        public DateTime? DeletedAt { get; set; }
        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}
