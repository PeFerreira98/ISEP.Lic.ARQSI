import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';

class Message { message: string };

@Injectable()
export class SignUpService {

  private registerUrl = 'http://arqsiit2.azurewebsites.net/api/user/register';

  constructor(private http: HttpClient) { }

  signUp(name: string, email: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.post<Message>(this.registerUrl, { name: name, email: email, password: password, utente: true, farmaceutico: false, medico: false })
        .subscribe(data => {
          console.log(data.message);
          if (data.message === "User Registered!") {
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
}
