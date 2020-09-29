import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {UsersService} from './services/users.service';
import {AuthService} from './services/auth.service';
import {Utilities} from './services/helper/utilities';
import {NgxChartsModule} from '@swimlane/ngx-charts';

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
    Utilities
  ]
})

export class SharedModule {
}
