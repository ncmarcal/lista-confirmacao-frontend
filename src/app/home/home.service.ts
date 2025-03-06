import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmacaoDTO } from './model/requisicao-confirmacao-presenca.model';
import { Observable } from 'rxjs';
import { URL_API } from '../shared/url-api';
import { getAuthHeaders } from '../shared/auth-headers';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private httpClient = inject(HttpClient);

  confirmarPresenca(requisicao: ConfirmacaoDTO): Observable<ConfirmacaoDTO> {
    return new Observable<ConfirmacaoDTO>((observer) => {
      this.httpClient.post<ConfirmacaoDTO>(URL_API + '/user/presence-confirmation', requisicao, {headers: getAuthHeaders()}).subscribe({
        next: (resposta) => {
          observer.next(resposta);
          observer.complete();
        },
        error: (erro) => {
          observer.error(erro);
          observer.complete();
        }
      })
    });
  }

  desconfirmarPresenca(requisicao: ConfirmacaoDTO): Observable<ConfirmacaoDTO> {
    return new Observable<ConfirmacaoDTO>((observer) => {
      this.httpClient.post<ConfirmacaoDTO>(URL_API + '/user/presence-disconfirm', requisicao, {headers: getAuthHeaders()}).subscribe({
        next: (resposta) => {
          observer.next(resposta);
          observer.complete();
        },
        error: (erro) => {
          observer.error(erro);
          observer.complete();
        }
      })
    });
  }

  verificarPresenca(requisicao: ConfirmacaoDTO): Observable<ConfirmacaoDTO> {
    return new Observable<ConfirmacaoDTO>((observer) => {
      this.httpClient.post<ConfirmacaoDTO>(URL_API + '/user/confirm-verification', requisicao, {headers: getAuthHeaders()}).subscribe({
        next: (resposta) => {
          observer.next(resposta);
          observer.complete();
        },
        error: (erro) => {
          observer.error(erro);
          observer.complete();
        }
      })
    });
  }
}
