using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ARQSI_IT1.Models;
using ARQSI_IT1.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace ARQSI_IT1.Controllers
{
    [Authorize]
    [Authorize(AuthenticationSchemes = "Bearer")]
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
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<MedicamentoDTO> GetMedicamento()
        {
            List<MedicamentoDTO> medicamentoDTOList = new List<MedicamentoDTO>();

            foreach(var medicamento in _context.Medicamento)
            {
                medicamentoDTOList.Add(new MedicamentoDTO(medicamento));
            }

            return medicamentoDTOList;
        }

        // GET: api/Medicamento/5
        [AllowAnonymous]
        [HttpGet("{id:int}")]
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

            return Ok(new MedicamentoDTO(medicamento));
        }

        // GET: api/Medicamento/Brufen
        [AllowAnonymous]
        [HttpGet("{nome}")]
        public IEnumerable<MedicamentoDTO> GetMedicamentoByName([FromRoute] string nome)
        {
            List<MedicamentoDTO> medicamentoDTOList = new List<MedicamentoDTO>();

            foreach (var medicamento in _context.Medicamento.Where(m => m.Nome == nome))
            {
                medicamentoDTOList.Add(new MedicamentoDTO(medicamento));
            }

            return medicamentoDTOList;
        }

        // GET: api/Medicamento/5/Apresentacoes
        [AllowAnonymous]
        [HttpGet("{id}/Apresentacoes")]
        public IEnumerable<ApresentacaoDTO> GetApresentacoesMedicamento([FromRoute] int id)
        {
            List<ApresentacaoDTO> apresentacaoDTOList = new List<ApresentacaoDTO>();

            foreach (var apresentacao in _context.Apresentacao
                .Include(m => m.Medicamento)
                .Include(m => m.Posologia)
                .Include(m => m.Farmaco)
                .Where(m => m.MedicamentoId == id))
            {
                 apresentacaoDTOList.Add(new ApresentacaoDTO(apresentacao));
            }

            return apresentacaoDTOList;
        }

        // GET: api/Medicamento/5/Posologias
        [AllowAnonymous]
        [HttpGet("{id}/Posologias")]
        public IEnumerable<PosologiaDTO> GetPosologiasMedicamento([FromRoute] int id)
        {
            List<PosologiaDTO> posologiasList = new List<PosologiaDTO>(); 

            foreach(var apresentacao in _context.Apresentacao.Where(a => a.MedicamentoId == id))
            {
                foreach (var posologia in _context.Posologia.Where(p => p.Id == apresentacao.PosologiaId))
                {
                    posologiasList.Add(new PosologiaDTO(posologia));
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