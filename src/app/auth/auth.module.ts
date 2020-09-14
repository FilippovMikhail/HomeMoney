import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component'
import {RegistrationComponent} from './registration/registration.component'
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ], /*Регистрация определенных компонентов внутри модуля*/
  imports: [
    /*Подключаем CommonModule, для работы с базовым функционалом angular (*ngIf, *ngFor ...)*/
    CommonModule,
    AuthRoutingModule
  ]
})

export class AuthModule {
}
