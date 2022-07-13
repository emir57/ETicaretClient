import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginReturnValue } from 'src/app/contracts/loginReturnValue';
import { Token } from 'src/app/contracts/token/token';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { AuthService } from '../auth.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService: HttpClientService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(user: { usernameOrEmail: string, password: string }, callBackFunction?: () => void): Promise<LoginReturnValue> {
    const observable: Observable<LoginReturnValue | User> = this.httpClientService.post<LoginReturnValue | User>({
      controller: "users",
      action: "login",
    }, user);
    const result = await firstValueFrom(observable);
    if (callBackFunction)
      callBackFunction();
    if ((result as LoginReturnValue).token) {
      localStorage.setItem("accessToken", (result as LoginReturnValue).token.accessToken);
      //localStorage.setItem("expiration", (result as LoginReturnValue).token.expiration.toString());
    }
    return result as LoginReturnValue;
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | LoginReturnValue> = this.httpClientService.post<SocialUser | LoginReturnValue>({
      action: "GoogleLogin",
      controller: "users"
    }, user);
    const tokenResponse: LoginReturnValue = await firstValueFrom(observable) as LoginReturnValue;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.authService.identityCheck();
      this.toastrService.success("Google üzerinden giriş başarıyla sağlanmıştır", "Giriş Başarılı");
    }
    if (callBackFunction)
      callBackFunction();
  }

  async facebookLogin(user: SocialUser, callbackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | LoginReturnValue> = this.httpClientService.post<SocialUser | LoginReturnValue>({
      controller: "users",
      action: "FacebookLogin",
    }, user);
    const tokenResponse: LoginReturnValue = await firstValueFrom(observable) as LoginReturnValue;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.authService.identityCheck();
      this.toastrService.success("Facebook üzerindne giriş başarıyla sağlanmıştır", "Giriş Başarılı");
    }
    if (callbackFunction)
      callbackFunction();
  }

}
