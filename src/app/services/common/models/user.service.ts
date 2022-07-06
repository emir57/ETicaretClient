import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginReturnValue } from 'src/app/contracts/loginReturnValue';
import { Token } from 'src/app/contracts/token/token';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService: HttpClientService
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

  async googleLogin(user: SocialUser) {
    const observable: Observable<SocialUser | LoginReturnValue> = this.httpClientService.post<SocialUser | LoginReturnValue>({
      action: "GoogleLogin",
      controller: "users"
    }, user);
    const tokenResponse: LoginReturnValue = await firstValueFrom(observable) as LoginReturnValue;
    if (tokenResponse)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
  }

}
