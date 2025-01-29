import { Component, Inject, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequisicaoLoginModel } from './model/requisicao-login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, IftaLabelModule, ButtonModule, FloatLabelModule, DividerModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private service = inject(LoginService);
  private router = inject(Router);
  private messageService = inject(MessageService)

  protected formLogin = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  })


  protected login(): void {
    const requisicaoLogin = new RequisicaoLoginModel();
    requisicaoLogin.username = this.formLogin.value.usuario ?? '';
    requisicaoLogin.password = this.formLogin.value.senha ?? '';
    this.service.login(requisicaoLogin).subscribe({
      next: (resposta) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login realizado com sucesso!' });
        sessionStorage.setItem("auth-token", Object.values(resposta).toString());
        this.router.navigate(['']);
      },
      error: (erro: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: erro.error });
      }
    })
  }



}
