using ARQSI_IT1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARQSI_IT1.Data
{
    public class DbInitializer
    {
        public static void Initialize(ARQSI_IT1Context _context)
        {
            _context.Database.EnsureCreated();

            // Look for Medicamento
            if (_context.Medicamento.Any())
            {
                return; // DB has Data
            }


// Medicamento Populate
            var medicamentos = new Medicamento[]
            {
                new Medicamento{Nome="Ben-U-Ron", Concentracao=250},
                new Medicamento{Nome="Ben-U-Ron", Concentracao=500},
                new Medicamento{Nome="Brufen", Concentracao=400},
                new Medicamento{Nome="Brufen", Concentracao=600},
                new Medicamento{Nome="Vadilex", Concentracao=20},
                new Medicamento{Nome="Factane", Concentracao=5},
                new Medicamento{Nome="Sabril", Concentracao=1000},
                new Medicamento{Nome="Safrux", Concentracao=530}
            };
            foreach(Medicamento medicamento in medicamentos)
            {
                _context.Medicamento.Add(medicamento);
            }
            _context.SaveChanges();

 
// Posologia Populate           
            var posologias = new Posologia[]
            {
                new Posologia{Quantidade=2000},
                new Posologia{Quantidade=1200},
                new Posologia{Quantidade=40},
                new Posologia{Quantidade=5},
                new Posologia{Quantidade=2000},
                new Posologia{Quantidade=530}
            };
            foreach (Posologia posologia in posologias)
            {
                _context.Posologia.Add(posologia);
            }
            _context.SaveChanges();


// Apresentacao Populate
            var apresentacoes = new Apresentacao[]
            {
                new Apresentacao{Forma="Comprimido", MedicamentoId=1, PosologiaId=1},
                new Apresentacao{Forma="Comprimido", MedicamentoId=2, PosologiaId=1},
                new Apresentacao{Forma="Comprimido", MedicamentoId=3, PosologiaId=2},
                new Apresentacao{Forma="Comprimido", MedicamentoId=4, PosologiaId=2},
                new Apresentacao{Forma="Comprimido", MedicamentoId=5, PosologiaId=3},
                new Apresentacao{Forma="Comprimido", MedicamentoId=6, PosologiaId=4},
                new Apresentacao{Forma="Comprimido", MedicamentoId=7, PosologiaId=5},
                new Apresentacao{Forma="Comprimido", MedicamentoId=8, PosologiaId=6}
            };
            foreach (Apresentacao apresentacao in apresentacoes)
            {
                _context.Apresentacao.Add(apresentacao);
            }
            _context.SaveChanges();


// Farmaco Populate
            var farmacos = new Farmaco[]
            {
                new Farmaco{Nome="Ibuprofeno", ApresentacaoId=1},
                new Farmaco{Nome="Ibuprofeno", ApresentacaoId=2},
                new Farmaco{Nome="Paracetamol", ApresentacaoId=3},
                new Farmaco{Nome="Paracetamol", ApresentacaoId=4},
                new Farmaco{Nome="Ifenprodil", ApresentacaoId=5},
                new Farmaco{Nome="Factor VIII", ApresentacaoId=6},
                new Farmaco{Nome="Vigabatrina", ApresentacaoId=7},
                new Farmaco{Nome="Bicarbonato de Sodio", ApresentacaoId=8},
                new Farmaco{Nome="Acido Tartarico", ApresentacaoId=8},
                new Farmaco{Nome="Bitartarato de Potassio", ApresentacaoId=8},
            };
            foreach (Farmaco farmaco in farmacos)
            {
                _context.Farmaco.Add(farmaco);
            }
            _context.SaveChanges();
        }
    }
}
