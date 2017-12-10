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

  createReceita( paciente: string, lstPrescricoes: Prescricao[] ): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.post<Receita>(this.receitasUrl + 'test/' + '?token=' + this.authenticationService.userInfo.token, 
        { paciente: String,
          prescricoes: lstPrescricoes
        })
        .subscribe(data => {
          console.log(data._id);
          if (data._id) {
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

  aviar(receitaId : string, prescricaoNr : Number, quantidade : Number) : Observable<any>{
    var link = this.receitasUrl + receitaId + '/prescricao/' + prescricaoNr + '/aviar/' + quantidade;

    return this.http.put(link, this.getHeaders());
  }


  alterReceita(_id: String, ndata: Date): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.put<Receita>(this.receitasUrl + _id + '?token=' + this.authenticationService.userInfo.token, { data:ndata })
        .subscribe(data => {
          console.log(data + ' ' + ndata);
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

  getReceitaByID(id : string): Observable<Receita> {
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
