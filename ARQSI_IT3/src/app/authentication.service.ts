import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';

import { User } from '../models/user';

class Token { token: string };

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://arqsiit2.azurewebsites.net/api/user/login';
  public userInfo: User;
  authentication: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.userInfo = localStorage.userInfo;
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.post<Token>(this.authUrl, { email: email, password: password })
        .subscribe(data => {
          if (data.token) {
            const tokenDecoded = jwt_decode(data.token);

            this.userInfo = {
              token: data.token,
              tokenExp: tokenDecoded.exp,
              medico: tokenDecoded.medico,
              farmaceutico: tokenDecoded.farmaceutico,
              utente: tokenDecoded.utente
            }

            console.log(this.userInfo);

            localStorage.userInfo = this.userInfo;

            console.log(localStorage.userInfo);

            this.authentication.next(this.userInfo);
            observer.next(true);

          } else {
            this.authentication.next(this.userInfo);
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

          this.authentication.next(this.userInfo);
          observer.next(false);

        });
    });
  }
  
  logout() {
    this.userInfo = null;
    localStorage.removeItem('userInfo');
    this.authentication.next(this.userInfo);
  }
  
}
