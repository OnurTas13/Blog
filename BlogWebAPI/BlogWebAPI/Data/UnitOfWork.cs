using BlogWebAPI.Data.repo;
using BlogWebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogWebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _dataContext;

        public UnitOfWork(DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        public ICategoryRepository CategoryRepository => new CategoryRepository(_dataContext);

        public IArticleRepository ArticleRepository => new ArticleRepository(_dataContext);
        public ICommentRepository CommentRepository => new CommentRepository(_dataContext);
        public IUserRepository UserRepository => new UserRepository(_dataContext);

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }
    }
}
