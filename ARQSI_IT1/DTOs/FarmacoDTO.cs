using ARQSI_IT1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARQSI_IT1.DTOs
{
    public class FarmacoDTO
    {
        public string Nome { get; set; }

        public FarmacoDTO(Farmaco farmaco)
        {
            this.Nome = farmaco.Nome;
        }
    }
}
