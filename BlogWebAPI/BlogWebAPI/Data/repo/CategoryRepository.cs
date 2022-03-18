using BlogWebAPI.Interfaces;
using BlogWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogWebAPI.Data.repo
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _dataContext;

        public CategoryRepository(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }
        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _dataContext.Categories.ToListAsync();
            
        }
    }
}
