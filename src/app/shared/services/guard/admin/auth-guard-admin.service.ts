import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) {}

    canActivate(): boolean {
      const token = this.tokenService.getToken();
      const userRole = this.tokenService.getUserRole();
      if (token && userRole === 'ROLE_ADMIN') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
