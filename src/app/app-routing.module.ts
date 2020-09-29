import {NgModule} from '@angular/core';
/*Класс Routes предоставляет коллекцию маршрутов*/
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {LoginComponent} from './auth/login/login.component';

/*Определяем маршруты*/
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, /*pathMatch: 'full' - обозначает полное соответствие маршруту*/
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule) /*Ленивая подгрузка модуля*/
  },
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
