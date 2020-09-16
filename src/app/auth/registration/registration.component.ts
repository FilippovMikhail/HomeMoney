import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {MessageModel} from '../../shared/models/message.model';
import {UsersService} from '../../shared/services/users.service';
import {UserModel} from '../../shared/models/user.model';
import {map, tap} from 'rxjs/operators';

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
              private router: Router) {

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

  /*Проверка валидности поля*/
  isValidInput(fieldName: string): boolean {
    const control = this.form.controls[fieldName];
    return control.invalid && control.touched;
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
