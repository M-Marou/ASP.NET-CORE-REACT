using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntelviaStore.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace IntelviaStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public CategoriesController(AppDbContext context,IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriesModel>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriesModel>> GetCategoriesModel(int id)
        {
            var categoriesModel = await _context.Categories.FindAsync(id);

            if (categoriesModel == null)
            {
                return NotFound();
            }

            return categoriesModel;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoriesModel(int id, CategoriesModel categoriesModel)
        {
            if (id != categoriesModel.CategoryID)
            {
                return BadRequest();
            }

            _context.Entry(categoriesModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriesModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoriesModel>> PostCategoriesModel([FromForm]CategoriesModel categoriesModel)
        {
            categoriesModel.ImageName = await SaveImage(categoriesModel.ImageFile);
            _context.Categories.Add(categoriesModel);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoriesModel(int id)
        {
            var categoriesModel = await _context.Categories.FindAsync(id);
            if (categoriesModel == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(categoriesModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoriesModelExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryID == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
