import { ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TokenService } from '../shared/services/token/token.service';
import { HomeService } from './home.service';
import { ConfirmacaoDTO } from './model/requisicao-confirmacao-presenca.model';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  confirmacaoDTO = new ConfirmacaoDTO();

  private tokenService = inject(TokenService);
  private service = inject(HomeService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.verificarPresenca();
  }


  confirmarPresenca(): void {
    const requisicao = this.recuperarUsuarioPeloToken();
    this.service.confirmarPresenca(requisicao).subscribe({
      next: (resposta) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: resposta.message });
        this.verificarPresenca();
      },
      error: (erro: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: erro.error });
      }
    })
  }

  verificarPresenca(): void {
    const requisicao = this.recuperarUsuarioPeloToken();
    this.service.verificarPresenca(requisicao).subscribe({
      next: (resposta) => {
        this.confirmacaoDTO.presence = resposta.presence;
      },
      error: (erro: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: erro.error });
      }
    })
  }


  recuperarUsuarioPeloToken(): ConfirmacaoDTO {
    const confirmacaoDTO = new ConfirmacaoDTO();
    confirmacaoDTO.username = this.tokenService.getUserName() ?? '';
    return confirmacaoDTO;
  }

  sair(): void {
    this.tokenService.logout();
    window.location.reload();
  }

}
