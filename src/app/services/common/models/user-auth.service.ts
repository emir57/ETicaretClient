import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginReturnValue } from 'src/app/contracts/loginReturnValue';
import { User } from 'src/app/entities/user';
import { AuthService } from '../auth.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private httpClientService: HttpClientService
  ) { }

  async login(user: { usernameOrEmail: string, password: string }, callBackFunction?: () => void): Promise<LoginReturnValue> {
    const observable: Observable<LoginReturnValue | User> = this.httpClientService.post<LoginReturnValue | User>({
      controller: "auth",
      action: "login",
    }, user);
    const result = await firstValueFrom(observable);
    if (callBackFunction)
      callBackFunction();
    if ((result as LoginReturnValue).token) {
      localStorage.setItem("accessToken", (result as LoginReturnValue).token.accessToken);
      localStorage.setItem("refreshToken", (result as LoginReturnValue).token.refreshToken);
      //localStorage.setItem("expiration", (result as LoginReturnValue).token.expiration.toString());
    }
    return result as LoginReturnValue;
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | LoginReturnValue> = this.httpClientService.post({
      action: "RefreshTokenLogin",
      controller: "auth",
    }, { refreshToken: refreshToken });

    const tokenResponse: LoginReturnValue = await firstValueFrom(observable);
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }
    if (callBackFunction)
      callBackFunction();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | LoginReturnValue> = this.httpClientService.post<SocialUser | LoginReturnValue>({
      action: "GoogleLogin",
      controller: "auth"
    }, user);
    const tokenResponse: LoginReturnValue = await firstValueFrom(observable) as LoginReturnValue;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.authService.identityCheck();
      this.toastrService.success("Google üzerinden giriş başarıyla sağlanmıştır", "Giriş Başarılı");
    }
    if (callBackFunction)
      callBackFunction();
  }

  async facebookLogin(user: SocialUser, callbackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | LoginReturnValue> = this.httpClientService.post<SocialUser | LoginReturnValue>({
      controller: "auth",
      action: "FacebookLogin",
    }, user);
    const tokenResponse: LoginReturnValue = await firstValueFrom(observable) as LoginReturnValue;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.authService.identityCheck();
      this.toastrService.success("Facebook üzerindne giriş başarıyla sağlanmıştır", "Giriş Başarılı");
    }
    if (callbackFunction)
      callbackFunction();
  }

}
