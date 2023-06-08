using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BookStore.Dto
{
    public class CategoryDto
    {


        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        //  should be excluded from post request body
        [SwaggerSchema(ReadOnly = true)]
        public int TotalBooks { get; set; }

    }
}
