using BlogWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogWebAPI.Dtos
{
    public class ArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ContentSummary { get; set; }
        public string ContentMain { get; set; }
        public string? Picture { get; set; }
        public DateTime PublishDate { get; set; }
        public int CategoryId { get; set; }
        public CategoryDto CategoryDto { get; set; }
        
        public int ViewCount { get; set; }
        public int CommentCount { get; set; }
    }
}
