import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token: string = localStorage.getItem("accessToken") as string;
    const decodeToken = this.jwtHelper.decodeToken(token);
    const expirationDate: Date | null = this.jwtHelper.getTokenExpirationDate(token);
    const isExpired: boolean = this.jwtHelper.isTokenExpired(token);
    debugger;
    return true;
  }

}
