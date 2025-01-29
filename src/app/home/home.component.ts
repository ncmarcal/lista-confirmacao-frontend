import { Component, inject, OnInit } from '@angular/core';
import { TokenService } from '../shared/services/token/token.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private tokenService = inject(TokenService);

  ngOnInit() {
    console.log(this.tokenService.getUserRole());
  }

}
