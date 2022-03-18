using AutoMapper;
using BlogWebAPI.Dtos;
using BlogWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogWebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Article, ArticleDto>().ForPath(x => x.CategoryDto.Id, opt => opt.MapFrom(s => s.Category.Id))
                                            .ForPath(x => x.CategoryDto.Name, opt => opt.MapFrom(s => s.Category.Name))
                                            .ForMember(x => x.CommentCount, opt => opt.MapFrom(x => x.Comments.Count));

            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<ArticleDto, Article>();

        }
    }
}
