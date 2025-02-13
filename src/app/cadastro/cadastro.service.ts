import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CadastroModel } from './model/cadastro.model';
import { Observable } from 'rxjs';
import { URL_API } from '../shared/url-api';
import { getAuthHeaders } from '../shared/auth-headers';
import { RespostaDTO } from './model/resposta-dto';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private httpClient = inject(HttpClient);

  cadastrarUsuario(requisicao: CadastroModel): Observable<RespostaDTO> {
    return new Observable<RespostaDTO>((observer) => {
      this.httpClient.post<RespostaDTO>(URL_API + '/admin/register', requisicao, {headers: getAuthHeaders()}).subscribe({
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
