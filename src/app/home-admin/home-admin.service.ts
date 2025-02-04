import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { URL_API } from '../shared/url-api';
import { Observable } from 'rxjs';
import { UsuariosModel } from './model/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class HomeAdminService {

  private httpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem("auth-token");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  carregarTodosUsuarios(): Observable<Array<UsuariosModel>> {
    return new Observable<Array<UsuariosModel>>((observer) => {
      this.httpClient.get<Array<UsuariosModel>>(URL_API + '/admin/list-all-users', {headers: this.getAuthHeaders()}).subscribe({
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
