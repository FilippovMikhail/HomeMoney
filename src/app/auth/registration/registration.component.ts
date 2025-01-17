import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {map, tap} from 'rxjs/operators';

import {MessageModel} from '../../shared/models/message.model';
import {UsersService} from '../../shared/services/users.service';
import {UserModel} from '../../shared/models/user.model';
import {Utilities} from '../../shared/services/helper/utilities';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private router: Router,
              private utilities: Utilities,
              private title: Title) {
    title.setTitle('Регистрация');
  }

  ngOnInit() {
    this.message = new MessageModel('', 'danger');
    this.form = this.fb.group({
      'email': [null, [Validators.required, Validators.email], [this.checkForEmailAsyncValidator.bind(this)]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'name': [null, [Validators.required]],
      /*Данное поле будет валидным только тогда, когда оно будет true */
      'agree': [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;

    const newUser = new UserModel(
      email,
      password,
      name
    );

    /*Создаем нового пользователя*/
    this.usersService.createNewUser(newUser).subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    });
  }

  /*Проверка невалидности поля*/
  isInvalidField(fieldName: string): boolean {
    return this.utilities.isInvalidField(fieldName, this.form);
  }

  /*Асинхронный валидатор, проверяющий email на уникальность*/
  checkForEmailAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.usersService.getUserByEmail(control.value)
      .pipe(
        map(user => {
          return user ? {emailExists: true} : null;
        }));
  }
}
