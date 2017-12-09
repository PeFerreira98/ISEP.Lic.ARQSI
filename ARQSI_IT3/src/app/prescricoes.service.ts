import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs/Rx';
import { AuthenticationService }   from './authentication.service';
import { Prescricao }              from '../models/prescricao';

@Injectable()
export class PrescricoesService {
  private prescricoesporaviarUrl = 
    'http://arqsiit2.azurewebsites.net/api/user/' + 
    this.authenticationService.userInfo.id +
    '/prescricao/poraviar';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getPrescricoesPorAviar(): Observable<Prescricao[]> {
    console.log(this.prescricoesporaviarUrl);
    var ret = this.http.get<Prescricao[]>(this.prescricoesporaviarUrl, this.getHeaders());
    console.log(ret);
    return ret;
  }

  getHeaders() {
    console.log(this.authenticationService.userInfo.token);
    
    let headers = new HttpHeaders({
      'x-access-token': this.authenticationService.userInfo.token
    });

    let httpOptions = { headers: headers };

    return httpOptions;
  }

}
