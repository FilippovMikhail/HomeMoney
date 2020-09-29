import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {UsersService} from './services/users.service';
import {AuthService} from './services/auth.service';
import {Utilities} from './services/helper/utilities';
import {AuthGuard} from './services/auth.guard';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [
    UsersService,
    AuthService,
    Utilities,
    AuthGuard
  ]
})

export class SharedModule {
}
