import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  /*Состояние нашей авторизации*/
  private isAuthenicated = false;

  /*Вход*/
  login() {
    this.isAuthenicated = true;
  }

  /*Выход*/
  logout() {
    this.isAuthenicated = false;
    window.localStorage.clear();
  }

  /*Проверка поля isAuthenicated*/
  isLoggedIn(): boolean {
    return this.isAuthenicated;
  }
}
