using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IagoAuction.DAL;
using IagoAuction.Models;

namespace IagoAuction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaintingsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PaintingsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Paintings/pages/1
        [HttpGet("pages/{batchIndex}")]
        public async Task<ActionResult<IEnumerable<Painting>>> GetPaintingsBatch(int batchIndex)
        {
            var paintings = await _context.Paintings.Skip(batchIndex - 1 * 12).Take(12).ToListAsync();
            return paintings;
        }

        // GET: api/Paintings/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Painting>>> GetAvailablePaintings()
        {
            var paintings = await _context.Paintings
                .Include(painting => painting.Lot)
                .Where(painting => painting.Lot == null)
                .ToListAsync();
            return paintings;
        }

        // GET: api/Paintings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Painting>> GetPainting(int id)
        {
            var painting = await _context.Paintings.FindAsync(id);

            if (painting == null)
            {
                return NotFound();
            }

            return painting;
        }

        // PUT: api/Paintings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPainting([FromForm] Painting painting, int id)
        {
            if (!PaintingExists(id))
            {
                return NotFound();
            }

            painting.Id = id;
            _context.Entry(painting).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok($"Successfully updated {painting.Title} painting.");
        }

        // POST: api/Paintings
        [HttpPost]
        public async Task<ActionResult<Painting>> PostPainting([FromForm]Painting painting)
        {
            _context.Paintings.Add(painting);
            await _context.SaveChangesAsync();

            return Ok($"Painting {painting.Title} has been added.");
        }

        // DELETE: api/Paintings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Painting>> DeletePainting(int id)
        {
            var painting = await _context.Paintings.FindAsync(id);
            if (painting == null)
            {
                return NotFound();
            }

            _context.Paintings.Remove(painting);
            await _context.SaveChangesAsync();

            return painting;
        }

        private bool PaintingExists(int id)
        {
            return _context.Paintings.Any(e => e.Id == id);
        }
    }
}
