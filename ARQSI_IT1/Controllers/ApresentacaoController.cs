using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ARQSI_IT1.Models;

namespace ARQSI_IT1.Controllers
{
    [Produces("application/json")]
    [Route("api/Apresentacao")]
    public class ApresentacaoController : Controller
    {
        private readonly ARQSI_IT1Context _context;

        public ApresentacaoController(ARQSI_IT1Context context)
        {
            _context = context;
        }

        // GET: api/Apresentacao
        [HttpGet]
        public IEnumerable<Apresentacao> GetApresentacao()
        {
            return _context.Apresentacao
                .Include(m => m.Medicamento)
                .Include(m => m.Posologia);
        }

        // GET: api/Apresentacao/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetApresentacao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var apresentacao = await _context.Apresentacao
                .Include(m => m.Medicamento)
                .Include(m => m.Posologia)
                .SingleOrDefaultAsync(m => m.Id == id);

            if (apresentacao == null)
            {
                return NotFound();
            }

            return Ok(apresentacao);
        }

        // PUT: api/Apresentacao/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApresentacao([FromRoute] int id, [FromBody] Apresentacao apresentacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != apresentacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(apresentacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApresentacaoExists(id))
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

        // POST: api/Apresentacao
        [HttpPost]
        public async Task<IActionResult> PostApresentacao([FromBody] Apresentacao apresentacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Apresentacao.Add(apresentacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApresentacao", new { id = apresentacao.Id }, apresentacao);
        }

        // DELETE: api/Apresentacao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApresentacao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var apresentacao = await _context.Apresentacao.SingleOrDefaultAsync(m => m.Id == id);
            if (apresentacao == null)
            {
                return NotFound();
            }

            _context.Apresentacao.Remove(apresentacao);
            await _context.SaveChangesAsync();

            return Ok(apresentacao);
        }

        private bool ApresentacaoExists(int id)
        {
            return _context.Apresentacao.Any(e => e.Id == id);
        }
    }
}