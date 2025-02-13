import { RoleEnum } from './../shared/enums/role-enum';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from './cadastro.service';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { CadastroModel } from './model/cadastro.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  imports: [RouterModule, CommonModule, CardModule, InputTextModule, FloatLabelModule, ButtonModule, DividerModule, ReactiveFormsModule, SelectModule, CheckboxModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  papeis = [
    'Administrador',
    'Usuário'
  ]

  private fb = inject(FormBuilder);
  private service = inject(CadastroService);
  private router = inject(Router);
  private messageService = inject(MessageService)

  protected formCadastro = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required],
    papel: ['', Validators.required],
    presenca: [false, Validators.required]
  })

  cadastrar(): void {
    if(this.formCadastro.valid) {
      this.service.cadastrarUsuario(this.montarRequisicao()).subscribe({
        next: (resposta) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: resposta.message });
        },
        error: (erro: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: erro.error });
        }
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha os campos obrigatórios!' });
    }
  }

  montarRequisicao(): CadastroModel {
    const cadastroModel = new CadastroModel();
    cadastroModel.username = this.formCadastro.value.usuario;
    cadastroModel.password = this.formCadastro.value.senha ?? '';
    cadastroModel.role = this.formCadastro.value.papel === 'Administrador' ? RoleEnum.ADMIN : RoleEnum.USER;
    cadastroModel.presence = this.formCadastro.value.presenca ?? false;
    return cadastroModel;
  }

  voltar(): void {
    this.router.navigate(['admin']);
  }
}
