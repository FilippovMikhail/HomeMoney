import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {CategoryModel} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  /*Флаг загрузки*/
  isLoaded = false;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];
  subscriptions: Subscription = new Subscription();
  chartData = [];

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest(
        this.categoriesService.getCategories(),
        this.eventsService.getEvents()
      )
        .subscribe((data: [CategoryModel[], EventModel[]]) => {
          this.categories = data[0];
          this.events = data[1];

          this.calculateChartData();

          this.isLoaded = true;
        })
    );
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach(cat => {
      const categoryEvent = this.events.filter(e => e.categoryId === cat.id && e.type === 'outcome');
      this.chartData.push({
        /*Название категории*/
        name: cat.name,
        /*Сумма трат по данной категории*/
        value: categoryEvent.reduce((sum, e) => sum + e.amount, 0)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
