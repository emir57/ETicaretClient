import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  async login(user: { usernameOrEmail: string, password: string }, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "login",
    }, user);
    await observable.toPromise();
    if (callBackFunction)
      callBackFunction();
  }
}
