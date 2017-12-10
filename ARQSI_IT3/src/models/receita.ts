import { Prescricao } from "./prescricao";

export class Receita {
    _id: string;
    paciente: string;
    medico: string;
    data: Date;
    __v: string;
    prescricoes: Prescricao[];
}