using AutoMapper;
using BlogWebAPI.Data;
using BlogWebAPI.Data.repo;
using BlogWebAPI.Dtos;
using BlogWebAPI.Interfaces;
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
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CategoryController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categoriesFromDb =  await _uow.CategoryRepository.GetCategoriesAsync();
            var categories = _mapper.Map<IEnumerable<CategoryDto>>(categoriesFromDb);
            return Ok(categories);
        }

       
     


        



    }
}
