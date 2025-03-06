import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token);
      return decodedToken.sub;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
  }
}
