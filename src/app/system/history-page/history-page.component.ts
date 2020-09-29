import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';

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
  filteredEvents: EventModel[] = [];
  subscriptions: Subscription = new Subscription();
  chartData = [];
  isFilterVisible = false;

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

          this.setOriginalEvents();
          this.calculateChartData();

          this.isLoaded = true;
        })
    );
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach(cat => {
      const categoryEvent = this.filteredEvents.filter(e => e.categoryId === cat.id && e.type === 'outcome');
      this.chartData.push({
        /*Название категории*/
        name: cat.name,
        /*Сумма трат по данной категории*/
        value: categoryEvent.reduce((sum, e) => sum + e.amount, 0)
      });
    });
  }

  /*Открытие/Закрытие модального окна с фильтрацией*/
  private toggleFilterVisibility(dir: boolean): void {
    this.isFilterVisible = dir;
  }

  openFilter(): void {
    this.toggleFilterVisibility(true);
  }

  onFilterApply({types, categories, period}): void {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    /*Определим границы периода*/
    const startPeriod = moment().startOf(period).startOf('d');
    const endPeriod = moment().endOf(period).endOf('d');

    this.filteredEvents = this.filteredEvents
    /*Фильтруем по типу*/
      .filter(x => {
        return types.indexOf(x.type) !== -1;
      })
      /*Фильтруем по категории*/
      .filter(x => {
        return categories.indexOf(x.categoryId.toString()) !== -1;
      })
      /*Фильрация по периоду*/
      .filter(x => {
        /*Определим, входит ли дата в границы периода*/
        const momentDate = moment(x.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    /*Перерисовываем график с новыми данными*/
    this.calculateChartData();
  }

  /*Закрытие фильтра*/
  onFilterCancel(): void {
    this.toggleFilterVisibility(false);
    /*Возвращаем исходный массив с данными*/
    this.setOriginalEvents();
    /*Перерисовываем график*/
    this.calculateChartData();
  }

  private setOriginalEvents(): void {
    this.filteredEvents = this.events.slice();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
