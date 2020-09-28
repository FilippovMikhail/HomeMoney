import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {CategoriesService} from '../../shared/services/categories.service';
import {CategoryModel} from '../../shared/models/category.model';
import {Utilities} from '../../../shared/services/helper/utilities';
import {MessageModel} from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: MessageModel;
  subscriptions: Subscription = new Subscription();

  @Output() onCategoryAdd = new EventEmitter<CategoryModel>();

  constructor(private fb: FormBuilder,
              private categoriesService: CategoriesService,
              private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.message = new MessageModel('', 'success');
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      value: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    const {name, value} = this.form.value;
    const category = new CategoryModel(name, value);
    this.subscriptions.add(
      this.categoriesService.addCategory(category)
        .subscribe(result => {
          /*Очищение формы*/
          this.form.reset();
          /*Устанавливаем значение для поля value*/
          this.form.patchValue({value: 1}, {emitEvent: false});
          this.message.text = 'Данные успешно добавлены!';
          setTimeout(() => {
            this.message.text = '';
          }, 5000);
          this.onCategoryAdd.emit(result);
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
