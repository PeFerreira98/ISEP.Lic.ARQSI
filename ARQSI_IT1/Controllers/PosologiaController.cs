using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ARQSI_IT1.Models;
using ARQSI_IT1.DTOs;

namespace ARQSI_IT1.Controllers
{
    //[Authorize]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/Posologia")]
    public class PosologiaController : Controller
    {
        private readonly ARQSI_IT1Context _context;

        public PosologiaController(ARQSI_IT1Context context)
        {
            _context = context;
        }

        // GET: api/Posologia
        [HttpGet]
        public IEnumerable<PosologiaDTO> GetPosologia()
        {
            List<PosologiaDTO> posologiaDTOList = new List<PosologiaDTO>();

            foreach (var posologia in _context.Posologia)
            {
                posologiaDTOList.Add(new PosologiaDTO(posologia));
            }

            return posologiaDTOList;
        }

        // GET: api/Posologia/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPosologia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var posologia = await _context.Posologia.SingleOrDefaultAsync(m => m.Id == id);

            if (posologia == null)
            {
                return NotFound();
            }

            return Ok(new PosologiaDTO(posologia));
        }

        // PUT: api/Posologia/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPosologia([FromRoute] int id, [FromBody] Posologia posologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != posologia.Id)
            {
                return BadRequest();
            }

            _context.Entry(posologia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PosologiaExists(id))
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

        // POST: api/Posologia
        [HttpPost]
        public async Task<IActionResult> PostPosologia([FromBody] Posologia posologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Posologia.Add(posologia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPosologia", new { id = posologia.Id }, posologia);
        }

        // DELETE: api/Posologia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePosologia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var posologia = await _context.Posologia.SingleOrDefaultAsync(m => m.Id == id);
            if (posologia == null)
            {
                return NotFound();
            }

            _context.Posologia.Remove(posologia);
            await _context.SaveChangesAsync();

            return Ok(posologia);
        }

        private bool PosologiaExists(int id)
        {
            return _context.Posologia.Any(e => e.Id == id);
        }
    }
}