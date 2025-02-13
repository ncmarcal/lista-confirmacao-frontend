import { HttpHeaders } from "@angular/common/http";

 export function getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem("auth-token");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }
