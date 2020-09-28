import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {UsersService} from './services/users.service';
import {AuthService} from './services/auth.service';
import {Utilities} from './services/helper/utilities';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UsersService,
    AuthService,
    Utilities
  ]
})

export class SharedModule {
}
