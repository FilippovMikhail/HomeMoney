import {Component, Input, OnInit} from '@angular/core';

import {CategoryModel} from '../../shared/models/category.model';
import {EventModel} from '../../shared/models/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: CategoryModel[] = [];
  @Input() events: EventModel[] = [];

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';


  constructor() {
  }

  ngOnInit(): void {
    this.events.forEach(e => {
      e.categoryName = this.categories.find(x => x.id === e.categoryId).name;
    });
  }


  getEventClass(event: EventModel) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income'
    };
  }

  /*Изменение критериев поиска*/
  changeCriteria(field: string): void {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchField = field;
    this.searchPlaceholder = namesMap[field];
  }
}
