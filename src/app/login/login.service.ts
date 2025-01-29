import { URL_API } from './../shared/url-api';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoLoginModel } from './model/requisicao-login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient = inject(HttpClient);

  login(requisicao: RequisicaoLoginModel): Observable<Object> {
    return new Observable<Object>((observer) => {
      this.httpClient.post(URL_API + '/auth/login', requisicao).subscribe({
        next: (resposta) => {
          observer.next(resposta);
          observer.complete();
        },
        error: (erro) => {
          observer.error(erro);
          observer.complete();
        }
      })
    })
  }
}
