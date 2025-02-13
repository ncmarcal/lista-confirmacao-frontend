import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { URL_API } from '../shared/url-api';
import { Observable } from 'rxjs';
import { UsuariosModel } from './model/usuarios.model';
import { getAuthHeaders } from '../shared/auth-headers';

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
}
