import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserModel} from '../models/user.model';
import {BaseApi} from '../core/base-api';

@Injectable({
  providedIn: 'root'
})

export class UsersService extends BaseApi {

  constructor(protected http: HttpClient) {
    super(http);
  }

  /*Получить пользователя по email*/
  getUserByEmail(email: string): Observable<UserModel> {
    return this.get(`users?email=${email}`)
      .pipe(
        map((user: UserModel[]) => user[0] ? user[0] : undefined)
      );
  }

  /*Добавление нового пользователя*/
  createNewUser(user: UserModel) {
    return this.post('users', user);
  }
}
