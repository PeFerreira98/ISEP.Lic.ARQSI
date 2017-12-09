import { Component, OnInit }  from '@angular/core';

import { Prescricao }         from '../../models/prescricao'
import { PrescricoesService } from '../prescricoes.service'

@Component({
  selector: 'app-prescricoes',
  templateUrl: './prescricoes.component.html',
  styleUrls: ['./prescricoes.component.css']
})
export class PrescricoesComponent implements OnInit {

  prescricoes: Prescricao[] = [];

  constructor(private prescricaoservice: PrescricoesService) { }

  ngOnInit() {
    this.prescricaoservice.getPrescricoesPorAviar()
      .subscribe(prescricoes => { this.prescricoes = prescricoes; });
  }

}
