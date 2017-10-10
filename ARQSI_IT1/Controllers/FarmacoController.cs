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
            return _context.Farmaco;
        }

        // GET: api/Farmaco/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFarmaco([FromRoute] int id)
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

            return Ok(farmaco);
        }

        // GET: api/Farmaco/Ibuprofeno
        // Incomplete (need 2 return list/enumerable)
        [HttpGet("{nome}")]
        public async Task<IActionResult> GetFarmaco([FromRoute] string nome)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.Nome.Equals(nome));

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
            List<Medicamento> medicamentosList = new List<Medicamento>();

            foreach (var apresentacao in _context.Apresentacao
                .Include(a => a.Medicamento)
                .Where(a => a.FarmacoId == id))
            {
                    medicamentosList.Add(apresentacao.Medicamento);
            }

            return medicamentosList;
        }

        // GET: api/Farmaco/5/Apresentacoes
        [HttpGet("{id}/apresentacoes")]
        public IEnumerable<Apresentacao> GetApresentacoesFarmaco([FromRoute] int id)
        {
            return _context.Apresentacao
                .Include(m => m.Medicamento)
                .Include(m => m.Farmaco)
                .Include(m => m.Posologia)
                .Where(m => m.FarmacoId == id);
        }
        
        // GET: api/Farmaco/5/Posologias
        [HttpGet("{id}/posologias")]
        public IEnumerable<Posologia> GetPosologiasFarmaco([FromRoute] int id)
        {
            List<Posologia> posologiasList = new List<Posologia>();

            foreach (var apresentacao in _context.Apresentacao
                .Include(a => a.Posologia)
                .Where(a => a.FarmacoId == id))
            {
                    posologiasList.Add(apresentacao.Posologia);
            }

            return posologiasList;
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