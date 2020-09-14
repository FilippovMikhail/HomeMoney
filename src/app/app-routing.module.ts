import {NgModule} from '@angular/core';
/*Класс Routes предоставляет коллекцию маршрутов*/
import {Routes, RouterModule} from '@angular/router';

/*Определяем маршруты*/
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'} /*pathMatch: 'full' - обозначает полное соответствие маршруту*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
