using BlogWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogWebAPI.Interfaces
{
    public interface IArticleRepository
    {
        Task AddArticleAsync(Article article);
        void DeleteArticle(int id);
        Task UpdateArticleAsync(Article article);
        Task<Article> GetArticleByIdAsync(int id);
        Task<IEnumerable<Article>> GetArticlesAsync();
        Task<IEnumerable<Article>> GetArticlesPgnAsync(int page = 1, int pageSize = 5);
        Task<IEnumerable<Article>> GetArticlesPgnByCategoryAsync(int id, int page = 1, int pageSize = 5);
        Task<int> GetArticleCountAsync();
        Task<int> GetCountOfArticleByCategoryAsync(int categoryId);
        Task ArticleViewCountUpAsync(int id);
    }
}
