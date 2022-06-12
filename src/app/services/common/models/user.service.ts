import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginReturnValue } from 'src/app/contracts/loginReturnValue';
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
    return (await observable.toPromise()) as Create_User;
  }

  async login(user: { usernameOrEmail: string, password: string }, callBackFunction?: () => void): Promise<LoginReturnValue> {
    const observable: Observable<LoginReturnValue | User> = this.httpClientService.post<LoginReturnValue | User>({
      controller: "users",
      action: "login",
    }, user);
    const result = await observable.toPromise();
    if (callBackFunction)
      callBackFunction();
    return result as LoginReturnValue;
  }
}
