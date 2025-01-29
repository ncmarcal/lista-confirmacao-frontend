import { HttpClient } from '@angular/common/http';
import { LINK_API } from './../shared/link-api';
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
      this.httpClient.post(LINK_API + '/auth/login', requisicao).subscribe({
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
