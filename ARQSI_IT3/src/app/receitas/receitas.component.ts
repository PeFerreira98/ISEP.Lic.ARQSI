import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Receita } from '../../models/receita';
import { ReceitasService } from '../receitas.service';
import { Prescricao } from '../../models/prescricao';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {

  receitas: Receita[] = [];
  lstPrescricoes: any[] = [];
  selectedReceita: Receita;
  model: any = {};
  error = '';

  constructor(
    private router: Router,
    private receitaService: ReceitasService
  ) { }

  ngOnInit() {
    this.receitaService.getReceitas()
      .subscribe(receitas => { this.receitas = receitas; });
  }

  alterReceita() {
    this.receitaService.alterReceita(this.selectedReceita._id, this.selectedReceita.data)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/receita']);
        } else {
          this.error = 'Error Ocurred';
        }
      });
  }

  createReceita() {
    this.receitaService.createReceita(this.model.paciente, this.lstPrescricoes)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/receita']);
        } else {
          this.error = 'Error Ocurred';
        }
      });

    this.lstPrescricoes = [];
  }

  addPrescricao(numero: string, apresentacaoid: string, validade: string, qtdPrescrita: string) {

    let prescricao = {
      numero: numero,
      apresentacaoID: apresentacaoid,
      quantidade: qtdPrescrita,
      validade: validade
    };

    this.lstPrescricoes.push(prescricao);
  }

  onSelect(receita: Receita): void {
    this.selectedReceita = receita;
  }

  isSelected(): boolean {
    if (this.selectedReceita) {
      return true;
    } else {
      return false;
    }
  }
}