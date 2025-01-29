import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequisicaoLoginModel } from './model/requisicao-login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, IftaLabelModule, ButtonModule, FloatLabelModule, DividerModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private service = inject(LoginService);


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
        console.log(resposta);
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }



}
