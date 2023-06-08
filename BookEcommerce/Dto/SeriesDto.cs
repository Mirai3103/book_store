using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BookStore.Dto
{
    public class SeriesDto
    {


        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public int TotalBooks { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public BookPreviewDto? LastedBook { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public DateTime UpdatedAt { get; set; }
        public string Slug { get; set; } = null!;
        public int AuthorId { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public AuthorDto? Author { get; set; }
        public int PublisherId { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public PublisherDto? Publisher { get; set; }
    }
}
