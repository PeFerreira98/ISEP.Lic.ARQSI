using ARQSI_IT1.Models;

namespace ARQSI_IT1.DTOs
{
    public class MedicamentoDTO
    {
        public string Nome { get; set; }
        public double Concentracao { get; set; }

        public MedicamentoDTO(Medicamento medicamento)
        {
            this.Nome = medicamento.Nome;
            this.Concentracao = medicamento.Concentracao;
        }
    }
}
