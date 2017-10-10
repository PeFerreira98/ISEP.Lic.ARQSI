using ARQSI_IT1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARQSI_IT1.DTOs
{
    public class ApresentacaoDTO
    {
        public string Forma { get; set; }
        public string MedicamentoNome { get; set; }
        public double MedicamentoConcentracao { get; set; }
        public double PosologiaQuantidade { get; set; }
        public string FarmacoNome { get; set; }

        public ApresentacaoDTO(Apresentacao apresentacao)
        {
            this.Forma = apresentacao.Forma;
            this.MedicamentoNome = apresentacao.Medicamento.Nome;
            this.MedicamentoConcentracao = apresentacao.Medicamento.Concentracao;
            this.PosologiaQuantidade = apresentacao.Posologia.Quantidade;
            this.FarmacoNome = apresentacao.Farmaco.Nome;
        }
    }
}
