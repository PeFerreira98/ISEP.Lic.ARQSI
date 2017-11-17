using ARQSI_IT1.Models;

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
