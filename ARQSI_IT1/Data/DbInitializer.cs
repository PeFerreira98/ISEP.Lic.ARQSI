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

//// Account Populate
//            var accounts = new AccountRegisterLogin[]
//            {

//                new AccountRegisterLogin()
//            };
//            foreach (Acc medicamento in medicamentos)
//            {
//                _context.Medicamento.Add(medicamento);
//            }
//            _context.SaveChanges();

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

// Farmaco Populate
            var farmacos = new Farmaco[]
            {
                new Farmaco{Nome="Ibuprofeno"},
                new Farmaco{Nome="Paracetamol"},
                new Farmaco{Nome="Ifenprodil"},
                new Farmaco{Nome="Factor VIII"},
                new Farmaco{Nome="Vigabatrina"},
                new Farmaco{Nome="Bicarbonato de Sodio + Acido Tartarico + Bitartarato de Potassio"}
            };
            foreach (Farmaco farmaco in farmacos)
            {
                _context.Farmaco.Add(farmaco);
            }
            _context.SaveChanges();

// Apresentacao Populate
            var apresentacoes = new Apresentacao[]
            {
                new Apresentacao{Forma="Comprimido", FarmacoId=1, MedicamentoId=1, PosologiaId=1},
                new Apresentacao{Forma="Comprimido", FarmacoId=1, MedicamentoId=2, PosologiaId=1},
                new Apresentacao{Forma="Comprimido", FarmacoId=2, MedicamentoId=3, PosologiaId=2},
                new Apresentacao{Forma="Comprimido", FarmacoId=2, MedicamentoId=4, PosologiaId=2},
                new Apresentacao{Forma="Supositorio", FarmacoId=2, MedicamentoId=4, PosologiaId=2},
                new Apresentacao{Forma="Comprimido", FarmacoId=3, MedicamentoId=5, PosologiaId=3},
                new Apresentacao{Forma="Comprimido", FarmacoId=4, MedicamentoId=6, PosologiaId=4},
                new Apresentacao{Forma="Comprimido", FarmacoId=5, MedicamentoId=7, PosologiaId=5},
                new Apresentacao{Forma="Comprimido", FarmacoId=6, MedicamentoId=8, PosologiaId=6}
            };
            foreach (Apresentacao apresentacao in apresentacoes)
            {
                _context.Apresentacao.Add(apresentacao);
            }
            _context.SaveChanges();
        }
    }
}
