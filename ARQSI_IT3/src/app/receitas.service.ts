import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Receita } from '../models/receita';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ReceitasService {
  private receitasUrl = 'http://arqsiit2.azurewebsites.net/api/receita';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.receitasUrl, this.getHeaders());
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
