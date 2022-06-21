import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken") as string;
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }
    _isAuthenticated = token != null && !expired;
  }
}

export let _isAuthenticated: boolean;
