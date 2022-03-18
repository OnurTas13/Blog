using BlogWebAPI.Interfaces;
using BlogWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogWebAPI.Data.repo
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly DataContext _dataContext;


        public ArticleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task AddArticleAsync(Article article)
        {
            await _dataContext.Articles.AddAsync(article);
        }

        public void DeleteArticle(int id)
        {
             var article =  _dataContext.Articles.Find(id);
            _dataContext.Remove(article);
            
        }

        public async Task<Article> GetArticleByIdAsync(int id)
        {
             return await _dataContext.Articles.Include(x => x.Category).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> GetArticleCountAsync()
        {
             return await _dataContext.Articles.CountAsync();
        }

        public async Task<IEnumerable<Article>> GetArticlesPgnByCategoryAsync(int categoryId, int page = 1, int pagesize = 5)
        {
            return await _dataContext.Articles.Include(x => x.Category).Include(x => x.Comments).Where(x => x.Category.Id == categoryId).OrderByDescending(x => x.PublishDate).
                 Skip(pagesize * (page - 1)).Take(pagesize).ToListAsync();
          
        }

        public async Task<IEnumerable<Article>> GetArticlesAsync()
        {
             return await _dataContext.Articles.ToListAsync();
        }

        public async Task<IEnumerable<Article>> GetArticlesPgnAsync(int page = 1, int pageSize = 5)
        { 
              return await _dataContext.Articles.Include(x => x.Category).Include(x => x.Comments).OrderByDescending(x => x.PublishDate).
               Skip(pageSize * (page - 1)).Take(pageSize).ToListAsync();
        }

        public async Task<int> GetCountOfArticleByCategoryAsync(int categoryId)
        {
            return await _dataContext.Articles.Where(x => x.Category.Id == categoryId).CountAsync();
        }

        public async Task ArticleViewCountUpAsync(int id)
        {
            var article = await _dataContext.Articles.FindAsync(id);
            article.ViewCount += 1;
        }

        public async Task UpdateArticleAsync(Article article)
        {
            var articleFromDb = await _dataContext.Articles.FirstOrDefaultAsync(x => x.Id == article.Id);

            if (articleFromDb != null)
            {
                articleFromDb.ContentMain = article.ContentMain;
                articleFromDb.CategoryId = article.CategoryId;
                articleFromDb.ContentSummary = article.ContentSummary;
                articleFromDb.Picture = article.Picture;
                articleFromDb.Title = article.Title;

                await _dataContext.SaveChangesAsync();
            }
        }
    }
}
