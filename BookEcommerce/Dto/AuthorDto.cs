using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BookStore.Dto
{
    public class AuthorDto
    {


        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public int TotalBooks { get; set; }

    }
}
