import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: CategoryModel[] = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategoties = [];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategoties = [];
    this.onFilterCancel.emit();
  }

  onApply(): void {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategoties,
      period: this.selectedPeriod
    });
  }

  handleChangeCategory({checked, value}): void {
    this.calculateInputParams('selectedCategoties', checked, value);
  }

  handleChangeType({checked, value}): void {
    this.calculateInputParams('selectedTypes', checked, value);
  }


  private calculateInputParams(field: string, checked: boolean, value: string): void {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(x => x !== value);
    }
  }
}
