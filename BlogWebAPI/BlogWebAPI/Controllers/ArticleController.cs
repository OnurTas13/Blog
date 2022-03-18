using AutoMapper;
using BlogWebAPI.Dtos;
using BlogWebAPI.Interfaces;
using BlogWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace BlogWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ArticleController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ArticleController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await _uow.ArticleRepository.GetArticlesAsync();
            return Ok(articles);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
             _uow.ArticleRepository.DeleteArticle(id);
            await _uow.SaveAsync();
            return Ok();
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddArticle(ArticleDto articleDto)
        {
            var article = _mapper.Map<Article>(articleDto);
            article.PublishDate = DateTime.Now;
            await _uow.ArticleRepository.AddArticleAsync(article);
            await _uow.SaveAsync();
            return Ok();
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(ArticleDto articleDto)
        {
            var article = _mapper.Map<Article>(articleDto);
            article.PublishDate = DateTime.Now;
            await _uow.ArticleRepository.UpdateArticleAsync(article);
            await _uow.SaveAsync();
            return Ok();
        }

        [HttpGet("GetArticlesPgnByCategory/{categoryId}/{page}/{pageSize}")]
        public async Task<IActionResult> GetArticlesPgnByCategory(int categoryId, int page, int pageSize)
        {
            var articlesFromDb = await _uow.ArticleRepository.GetArticlesPgnByCategoryAsync(categoryId, page, pageSize);
            var articles = _mapper.Map<IEnumerable<ArticleDto>>(articlesFromDb);
            var totalCount = await _uow.ArticleRepository.GetCountOfArticleByCategoryAsync(categoryId);

            var result = new
            {
                TotalCount = totalCount,
                Articles = articles
            };

            return Ok(result);
        }
        [AllowAnonymous]
        [HttpGet("pgn/{page}/{pageSize}")]
        public async Task<IActionResult> GetArticlesByPgn(int page, int pageSize)
        {
            var articlesFromDb = await _uow.ArticleRepository.GetArticlesPgnAsync(page, pageSize);   
            var totalCount = await _uow.ArticleRepository.GetArticleCountAsync();
            var articles = _mapper.Map<IEnumerable<ArticleDto>>(articlesFromDb);

            var result = new
            {
                TotalCount = totalCount,
                Articles = articles
            };
            
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticlebyId(int id)
        {
            var articleFromDb = await _uow.ArticleRepository.GetArticleByIdAsync(id);
            var article = _mapper.Map<ArticleDto>(articleFromDb);
            return Ok(article);

        }
        [AllowAnonymous]
        [HttpGet("ArticleViewCountUp/{id}")]
        public async Task<IActionResult> ArticleVieWCountUp(int id)
        {
            await _uow.ArticleRepository.ArticleViewCountUpAsync(id);
            await _uow.SaveAsync();
            return Ok();
        }

        [HttpPost("SaveArticlePicture")]
        public async Task<IActionResult> SaveArticlePicture(IFormFile picture)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(picture.FileName);
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", fileName);
            using (var stream = new FileStream(path,FileMode.Create))
            {
                await picture.CopyToAsync(stream);
            }

            var result = new
            {
                path = "https://" + Request.Host + "/images/" + fileName
            };

            return Ok(result);
        }
      
        

      


    }
}
