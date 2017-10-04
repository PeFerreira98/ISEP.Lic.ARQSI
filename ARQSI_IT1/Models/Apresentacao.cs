using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARQSI_IT1.Models
{
    public class Apresentacao
    {
        public int Id { get; set; }
        public string Forma { get; set; }
        public int MedicamentoId { get; set; }
        public Medicamento Medicamento { get; set; }
        public int PosologiaId { get; set; }
        public Posologia Posologia { get; set; }
    }
}
