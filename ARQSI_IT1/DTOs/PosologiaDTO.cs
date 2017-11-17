using ARQSI_IT1.Models;

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
