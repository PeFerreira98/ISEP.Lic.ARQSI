import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs/Rx';
import { AuthenticationService }   from './authentication.service';
import { Medicamento }             from '../models/medicamento'

@Injectable()
export class MedicamentosService {
  private medicamentosUrl = 'http://arqsiit1.azurewebsites.net/api/medicamento/';

  constructor(
    private http: HttpClient
  ) { }

  getMedicamentos(): Observable<Medicamento[]> {
    var ret = this.http.get<Medicamento[]>(this.medicamentosUrl);
    return ret;
  }

}
