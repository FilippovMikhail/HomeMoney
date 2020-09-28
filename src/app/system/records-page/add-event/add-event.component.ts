import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {CategoryModel} from '../../shared/models/category.model';
import {Utilities} from '../../../shared/services/helper/utilities';
import {MessageModel} from '../../../shared/models/message.model';
import {EventModel} from '../../shared/models/event.model';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: CategoryModel[] = [];

  form: FormGroup;
  message: MessageModel;
  subscriptions: Subscription = new Subscription();
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor(private fb: FormBuilder,
              private utilities: Utilities,
              private eventsService: EventsService,
              private billService: BillService) {
  }

  ngOnInit(): void {
    this.message = new MessageModel('', 'danger');
    this.form = this.fb.group({
      category: [1, [Validators.required]],
      type: ['outcome'],
      amount: [1, [Validators.required, Validators.min(1)]],
      description: [null, Validators.required]
    });
  }

  private showMessage(message: MessageModel): void {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(): void {

    const {amount, description, category, type} = this.form.value;

    const event = new EventModel(
      type,
      amount,
      +category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      description
    );

    this.subscriptions.add(
      /*Получение счета*/
      this.billService.getBill()
        .subscribe(bill => {
          let value = 0;
          /*Если был расход - проверяем
          * хватает ли денег на данное событие*/
          if (type === 'outcome') {
            if (amount > bill.value) {
              this.showMessage({
                text: `Ошибка: недостаточно средств на счете. Вам не хватает: ${amount - bill.value}`,
                type: 'danger'
              });
              return;
            } else {
              value = bill.value - amount;
              this.showMessage({
                text: 'Данная сумма успешно снята со счета',
                type: 'success'
              });
            }
          }
          /*Если был доход, то добавляем к нашему счету значение суммы*/
          else {
            value = bill.value + amount;
          }
          /*Обновляем счет*/
          this.billService.updateBill({value, currency: bill.currency})
            .pipe(
              mergeMap(() => this.eventsService.addEvent(event))
            )
            .subscribe(() => {
              this.form.setValue({
                amount: 1,
                description: ' ',
                category: 1,
                type: 'outcome'
              });
            });
        })
    );
  }

  /*Проверка невалидности поля*/
  isInvalidField(fieldName: string): boolean {
    return this.utilities.isInvalidField(fieldName, this.form);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
