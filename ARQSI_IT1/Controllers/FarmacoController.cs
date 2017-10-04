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
    [Route("api/Farmaco")]
    public class FarmacoController : Controller
    {
        private readonly ARQSI_IT1Context _context;

        public FarmacoController(ARQSI_IT1Context context)
        {
            _context = context;
        }

        // GET: api/Farmaco
        [HttpGet]
        public IEnumerable<Farmaco> GetFarmaco()
        {
            return _context.Farmaco
                .Include(m => m.Apresentacao);
        }

        // GET: api/Farmaco/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFarmaco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco
                .Include(m => m.Apresentacao)
                .SingleOrDefaultAsync(m => m.Id == id);

            if (farmaco == null)
            {
                return NotFound();
            }

            return Ok(farmaco);
        }

        // GET: api/Farmaco/5/Medicamentos
        [HttpGet("{id}/medicamentos")]
        public IEnumerable<Medicamento> GetMedicamentosFarmaco([FromRoute] int id)
        {
            var farmaco = _context.Farmaco
                .Include(m => m.Apresentacao)
                .Single(f => f.Id == id);

            return _context.Medicamento.Where(m => m.Id == farmaco.Apresentacao.MedicamentoId);
        }

        // GET: api/Farmaco/5/Apresentacoes
        [HttpGet("{id}/apresentacoes")]
        public IEnumerable<Apresentacao> GetApresentacoesFarmaco([FromRoute] int id)
        {
            var farmaco = _context.Farmaco
                .Include(m => m.Apresentacao)
                .Single(f => f.Id == id);

            return _context.Apresentacao.Where(m => m.Id == farmaco.ApresentacaoId);
        }
        
        // GET: api/Farmaco/5/Posologias
        [HttpGet("{id}/posologias")]
        public IEnumerable<Posologia> GetPosologiasFarmaco([FromRoute] int id)
        {
            var farmaco = _context.Farmaco
                .Include(m => m.Apresentacao)
                .Single(f => f.Id == id);

            return _context.Posologia.Where(m => m.Id == farmaco.Apresentacao.PosologiaId);
        }
        
        // PUT: api/Farmaco/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFarmaco([FromRoute] int id, [FromBody] Farmaco farmaco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != farmaco.Id)
            {
                return BadRequest();
            }

            _context.Entry(farmaco).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FarmacoExists(id))
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

        // POST: api/Farmaco
        [HttpPost]
        public async Task<IActionResult> PostFarmaco([FromBody] Farmaco farmaco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Farmaco.Add(farmaco);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFarmaco", new { id = farmaco.Id }, farmaco);
        }

        // DELETE: api/Farmaco/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFarmaco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.Id == id);
            if (farmaco == null)
            {
                return NotFound();
            }

            _context.Farmaco.Remove(farmaco);
            await _context.SaveChangesAsync();

            return Ok(farmaco);
        }

        private bool FarmacoExists(int id)
        {
            return _context.Farmaco.Any(e => e.Id == id);
        }
    }
}