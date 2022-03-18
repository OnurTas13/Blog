using AutoMapper;
using BlogWebAPI.Dtos;
using BlogWebAPI.Interfaces;
using BlogWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CommentController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddComment(CommentDto commentDto)
        {
            var comment = _mapper.Map<Comment>(commentDto);
            comment.PublishDate = DateTime.Now;
            await _unitOfWork.CommentRepository.AddCommentAsync(comment);
            await _unitOfWork.SaveAsync();

            return Ok();
        }

        [HttpGet("listByArticle/{articleId}")]
        public async Task<IActionResult> GetCommentsByArticleId(int articleId)
        {
            var commentsFromDb = await _unitOfWork.CommentRepository.GetCommentsByArticleIdAsync(articleId);
            var comments = _mapper.Map<IEnumerable<CommentDto>>(commentsFromDb);
            return Ok(comments);
        }
    }
}
