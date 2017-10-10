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
    [Route("api/Medicamento")]
    public class MedicamentoController : Controller
    {
        private readonly ARQSI_IT1Context _context;

        public MedicamentoController(ARQSI_IT1Context context)
        {
            _context = context;
        }

        // GET: api/Medicamento
        [HttpGet]
        public IEnumerable<Medicamento> GetMedicamento()
        {
            return _context.Medicamento;
        }

        // GET: api/Medicamento/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedicamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicamento = await _context.Medicamento.SingleOrDefaultAsync(m => m.Id == id);

            if (medicamento == null)
            {
                return NotFound();
            }

            return Ok(medicamento);
        }

        // GET: api/Medicamento/Brufen
        // Incomplete (need 2 return list/enumerable)
        [HttpGet("{nome}")]
        public async Task<IActionResult> GetMedicamento([FromRoute] string nome)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicamento = await _context.Medicamento.SingleOrDefaultAsync(m => m.Nome.Equals(nome));

            if (medicamento == null)
            {
                return NotFound();
            }

            return Ok(medicamento);
        }

        // GET: api/Medicamento/5/Apresentacoes
        [HttpGet("{id}/Apresentacoes")]
        public IEnumerable<Apresentacao> GetApresentacoesMedicamento([FromRoute] int id)
        {
            return _context.Apresentacao
                .Include(m => m.Medicamento)
                .Include(m => m.Posologia)
                .Include(m => m.Farmaco)
                .Where(m => m.MedicamentoId == id);
        }

        // GET: api/Medicamento/5/Posologias
        [HttpGet("{id}/Posologias")]
        public IEnumerable<Posologia> GetPosologiasMedicamento([FromRoute] int id)
        {
            List<Posologia> posologiasList = new List<Posologia>(); 

            foreach(var apresentacao in _context.Apresentacao.Where(a => a.MedicamentoId == id))
            {
                foreach (var posologia in _context.Posologia.Where(p => p.Id == apresentacao.PosologiaId))
                {
                    posologiasList.Add(posologia);
                }
            }

            return posologiasList;
        }

        // PUT: api/Medicamento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicamento([FromRoute] int id, [FromBody] Medicamento medicamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medicamento.Id)
            {
                return BadRequest();
            }

            _context.Entry(medicamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicamentoExists(id))
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

        // POST: api/Medicamento
        [HttpPost]
        public async Task<IActionResult> PostMedicamento([FromBody] Medicamento medicamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Medicamento.Add(medicamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicamento", new { id = medicamento.Id }, medicamento);
        }

        // DELETE: api/Medicamento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicamento = await _context.Medicamento.SingleOrDefaultAsync(m => m.Id == id);
            if (medicamento == null)
            {
                return NotFound();
            }

            _context.Medicamento.Remove(medicamento);
            await _context.SaveChangesAsync();

            return Ok(medicamento);
        }

        private bool MedicamentoExists(int id)
        {
            return _context.Medicamento.Any(e => e.Id == id);
        }
    }
}