import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) {
  }

  /*Получить пользователя по email*/
  getUserByEmail(email: string): Observable<UserModel> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((user: UserModel[]) => user[0] ? user[0] : undefined)
      );
  }

  /*Добавление нового пользователя*/
  createNewUser(user: UserModel) {
    return this.http.post('http://localhost:3000/users', user);
  }
}
