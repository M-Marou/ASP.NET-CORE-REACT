using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntelviaStore.Models;

namespace IntelviaStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
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
            if (id != categoriesModel.Id)
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
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
