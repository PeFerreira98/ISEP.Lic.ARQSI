
namespace ARQSI_IT1.Models
{
    public class Apresentacao
    {
        public int Id { get; set; }
        public string Forma { get; set; }
        //public int FormaId { get; set; }
        //public Forma Forma { get; set; }
        public int MedicamentoId { get; set; }
        public Medicamento Medicamento { get; set; }
        public int PosologiaId { get; set; }
        public Posologia Posologia { get; set; }
        public int FarmacoId { get; set; }
        public Farmaco Farmaco { get; set; }
    }
}
