import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { URL_API } from '../shared/url-api';
import { Observable } from 'rxjs';
import { UsuariosModel } from './model/usuarios.model';
import { getAuthHeaders } from '../shared/auth-headers';
import { RespostaDTO } from '../shared/model/resposta-dto';

@Injectable({
  providedIn: 'root'
})
export class HomeAdminService {

  private httpClient = inject(HttpClient);

  carregarTodosUsuarios(): Observable<Array<UsuariosModel>> {
    return new Observable<Array<UsuariosModel>>((observer) => {
      this.httpClient.get<Array<UsuariosModel>>(URL_API + '/admin/list-all-users', {headers: getAuthHeaders()}).subscribe({
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

  deletarUsuario(id: number): Observable<RespostaDTO> {
    return new Observable<RespostaDTO>((observer) => {
      this.httpClient.delete<RespostaDTO>(URL_API + `/admin/delete/${id}`, {headers: getAuthHeaders()}).subscribe({
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
