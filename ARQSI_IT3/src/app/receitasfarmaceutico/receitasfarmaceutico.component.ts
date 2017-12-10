import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Receita } from '../../models/receita';
import { ReceitasService } from '../receitas.service';
import { Prescricao } from '../../models/prescricao';

@Component({
  selector: 'app-receitasfarmaceutico',
  templateUrl: './receitasfarmaceutico.component.html',
  styleUrls: ['./receitasfarmaceutico.component.css']
})
export class ReceitasfarmaceuticoComponent implements OnInit {

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

  search(receitaid : string) : any{
    this.receitaService.getReceitaByID(receitaid)
    .subscribe(receita => this.selectedReceita = receita);    
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