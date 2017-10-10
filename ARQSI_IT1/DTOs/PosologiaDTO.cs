using ARQSI_IT1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARQSI_IT1.DTOs
{
    public class PosologiaDTO
    {
        public double Quantidade { get; set; }

        public PosologiaDTO(Posologia posologia)
        {
            this.Quantidade = posologia.Quantidade;
        }
    }
}
