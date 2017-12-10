import { Component, OnInit } from '@angular/core';

import { Apresentacao } from '../../models/apresentacao';
import { ApresentacoesService } from '../apresentacoes.service'

@Component({
  selector: 'app-apresentacoes',
  templateUrl: './apresentacoes.component.html',
  styleUrls: ['./apresentacoes.component.css']
})
export class ApresentacoesComponent implements OnInit {

  apresentacoes: Apresentacao[] = [];

  constructor(private apresentacaoService: ApresentacoesService) { }

  ngOnInit() {
    this.apresentacaoService.getApresentacoes()
      .subscribe(apresentacoes => { this.apresentacoes = apresentacoes; });
  }

}
