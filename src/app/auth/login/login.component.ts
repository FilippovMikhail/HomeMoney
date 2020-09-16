import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {UserModel} from '../../shared/models/user.model';
import {MessageModel} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.message = new MessageModel('', 'danger');

    this.route.queryParams
      .subscribe(params => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Теперь вы можете зайти в систему',
            type: 'success'
          });
        }
      });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  private showMessage(message: MessageModel) {

    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: UserModel) => {
        if (user) {
          if (user.password === formData.password) {
            /*Если были ошибки, то их очищаем*/
            this.message.text = '';
            /*Добавим в localStorage объект нашего user*/
            window.localStorage.setItem('user', JSON.stringify(user));
            /*Успешный вход*/
            this.authService.login();
            /*Редиректим на страницу*/
            // this.router.navigate(['']);
          } else {
            this.showMessage({
              text: 'Пароль не верный',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Такого пользователя не существует',
            type: 'danger'
          });
        }
      });
    console.log(this.form);
  }

  /*Проверка валидности поля*/
  isValidInput(fieldName: string): boolean {
    const control = this.form.controls[fieldName];
    return control.invalid && control.touched;
  }
}
