import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Receita } from '../models/receita';
import { AuthenticationService } from './authentication.service';
import { Prescricao } from '../models/prescricao';

@Injectable()
export class ReceitasService {
  private receitasUrl = 'http://arqsiit2.azurewebsites.net/api/receita/';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  createReceita(pacienteid: string, lstPrescricoes: any): Observable<boolean> {
    console.log(pacienteid + ' ' + lstPrescricoes);
    return new Observable<boolean>(observer => {
      this.http.post<any>(this.receitasUrl, { paciente: pacienteid, prescricoes: lstPrescricoes }, this.getHeaders())
        .subscribe(data => {
          console.log(data);
          if (data) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error.");
          } else {
            console.log("Server-side error.");
          }
          console.log(err);

          observer.next(false);

        });
    });
  }

  aviar(receitaId: string, prescricaoNr: number, quantidade: string): Observable<any> {
    var newprescnr = prescricaoNr - 1;
    var link = this.receitasUrl + receitaId + '/prescricao/' + newprescnr + '/aviar/' + quantidade;

    return this.http.put<any>(link, {}, this.getHeaders());
  }

  alterReceita(_id: String, ndata: Date): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.put<Receita>(this.receitasUrl + _id + '?token=' + this.authenticationService.userInfo.token, { data: ndata })
        .subscribe(data => {
          if (data) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error.");
          } else {
            console.log("Server-side error.");
          }
          console.log(err);

          observer.next(false);
        });
    });
  }

  getReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.receitasUrl, this.getHeaders());
  }

  getReceitaByID(id: string): Observable<Receita> {
    return this.http.get<Receita>(this.receitasUrl + id, this.getHeaders());
  }

  getHeaders() {
    console.log(this.authenticationService.userInfo.token);

    let headers = new HttpHeaders({
      'x-access-token': this.authenticationService.userInfo.token
    });

    let httpOptions = {
      headers: headers
    };

    return httpOptions;
  }
}
