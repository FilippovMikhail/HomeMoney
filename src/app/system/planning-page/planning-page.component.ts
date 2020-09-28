import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {BillModel} from '../shared/models/bill.model';
import {CategoryModel} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  /*Флаг загрузки*/
  isLoaded = false;
  bill: BillModel;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest(
        this.billService.getBill(),
        this.categoriesService.getCategories(),
        this.eventsService.getEvents()
      )
        .subscribe((data: [BillModel, CategoryModel[], EventModel[]]) => {
          this.bill = data[0];
          this.categories = data[1];
          this.events = data[2];

          this.isLoaded = true;
        })
    );
  }

  /*Подсчет общих трат для категории*/
  getCategoryCost(category: CategoryModel): number {
    /*Получаем все события по данной категории*/
    const catEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    /*Общая сумма*/
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  /*Получение процентного соотношения от общих трат для категории*/
  private getPercent(category: CategoryModel): number {
    const percent = (this.getCategoryCost(category) / category.capacity) * 100;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(category: CategoryModel): string {
    return this.getPercent(category) + '%';
  }

  /*Получение название класса в зависимости от процента по категории*/
  getCatCollorClass(category: CategoryModel): string {
    /*Получаем процент по нашей категории*/
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
