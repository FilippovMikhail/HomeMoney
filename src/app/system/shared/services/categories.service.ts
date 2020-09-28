import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {CategoryModel} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseApi {
  constructor(protected http: HttpClient) {
    super(http);
  }

  /*Добавление категории*/
  addCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.post('categories', category);
  }

  /*Получиение категорий*/
  getCategories(): Observable<CategoryModel[]> {
    return this.get('categories');
  }

  /*Обновление категории*/
  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.put(`categories/${category.id}`, category);
  }
}
