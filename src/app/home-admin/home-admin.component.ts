import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TokenService } from '../shared/services/token/token.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-home-admin',
  imports: [CardModule, ButtonModule, DividerModule, TableModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent implements OnInit, AfterViewInit {

  customers = [
    { id: 1, name: 'Item 1', presenca: true },
    { id: 2, name: 'Item 2', presenca: true },
    { id: 3, name: 'Item 3', presenca: true },
    { id: 4, name: 'Item 4', presenca: true },
    { id: 5, name: 'Item 5', presenca: true },
    { id: 6, name: 'Item 6', presenca: true }
  ];

  private tokenService = inject(TokenService);

  ngOnInit() {
    console.log(this.tokenService.getUserRole());
  }

  ngAfterViewInit(): void {
  }

  deletar(): void {
    console.log('deletei')
  }

  sair(): void {
    this.tokenService.logout();
    window.location.reload();
  }

}
