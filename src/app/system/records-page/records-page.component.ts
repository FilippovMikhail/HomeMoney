import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {CategoryModel} from '../shared/models/category.model';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit, OnDestroy {

  /*Категории*/
  categories: CategoryModel[] = [];
  /*Флаг загрузки*/
  isLoaded = false;
  subscriptions: Subscription = new Subscription();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
    this.categoriesService.getCategories()
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
        /*Данные загрузились*/
        this.isLoaded = true;
      })
    );
  }

  /*Добавление категории*/
  newCategoryAdd(category: CategoryModel): void {
    this.categories.push(category);
  }

  /*Редактирование категории*/
  categoryWasEdited(category: CategoryModel): void {
    /*Поиск категории по идентификатору*/
    const index = this.categories
      .findIndex(c => c.id === category.id);
    /*Обновление категории*/
    this.categories[index] = category;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
