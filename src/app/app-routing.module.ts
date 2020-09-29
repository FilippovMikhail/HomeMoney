import {NgModule} from '@angular/core';
/*Класс Routes предоставляет коллекцию маршрутов*/
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

/*Определяем маршруты*/
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, /*pathMatch: 'full' - обозначает полное соответствие маршруту*/
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule) /*Ленивая подгрузка модуля*/
  }
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
