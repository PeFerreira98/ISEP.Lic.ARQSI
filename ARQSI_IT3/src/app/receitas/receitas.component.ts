import { Component, OnInit } from '@angular/core';

import { Receita }           from '../../models/receita';
import { ReceitasService }   from '../receitas.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {

  receitas: Receita[] = [];

  constructor(private receitaService: ReceitasService) { }

  ngOnInit() {
    this.receitaService.getReceitas()
      .subscribe(receitas => { this.receitas = receitas; });
  }
}