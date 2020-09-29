import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import {UsersService} from '../../shared/services/users.service';
import {UserModel} from '../../shared/models/user.model';
import {MessageModel} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {Utilities} from '../../shared/services/helper/utilities';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private utilities: Utilities,
              private title: Title,
              private meta: Meta) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин,вход,система'},
      {name: 'description', content: 'Страница для входа в систему'},
    ]);
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
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'Для работы с системой, необходимо войти',
            type: 'warning'
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
            this.router.navigate(['/system', 'bill']);
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

  /*Проверка невалидности поля*/
  isInvalidField(fieldName: string): boolean {
    return this.utilities.isInvalidField(fieldName, this.form);
  }
}
