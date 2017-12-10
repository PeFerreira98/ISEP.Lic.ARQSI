import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs/Rx';
import { AuthenticationService }   from './authentication.service';
import { Apresentacao } from '../models/apresentacao';

@Injectable()
export class ApresentacoesService {
  private apresentacoesUrl = 'http://arqsiit2.azurewebsites.net/api/receita/apresentacao/';

  constructor(private http: HttpClient) { }

  getApresentacoes(): Observable<Apresentacao[]> {
    var ret = this.http.get<Apresentacao[]>(this.apresentacoesUrl);
    return ret;
  }

}
