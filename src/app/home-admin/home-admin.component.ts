import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TokenService } from '../shared/services/token/token.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { HomeAdminService } from './home-admin.service';
import { UsuariosModel } from './model/usuarios.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-admin',
  imports: [CardModule, ButtonModule, DividerModule, TableModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent implements OnInit {


  usuariosModel = new Array<UsuariosModel>;

  private tokenService = inject(TokenService);
  private service = inject(HomeAdminService);
  private messageService = inject(MessageService)

  ngOnInit() {
    console.log(this.tokenService.getUserRole());
    this.carregarTodosUsuarios();
  }

  carregarTodosUsuarios(): void {
    this.service.carregarTodosUsuarios().subscribe({
      next: (resposta) => {
        this.usuariosModel = resposta;
      },
      error: (erro: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: erro.error });
      }
    })
  }

  deletar(): void {
    console.log('deletei')
  }

  sair(): void {
    this.tokenService.logout();
    window.location.reload();
  }

}
