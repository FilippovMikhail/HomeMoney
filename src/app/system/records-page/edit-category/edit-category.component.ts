import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {CategoryModel} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {MessageModel} from '../../../shared/models/message.model';
import {Utilities} from '../../../shared/services/helper/utilities';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: CategoryModel[] = [];

  @Output() onCategoryEdit = new EventEmitter<CategoryModel>();

  form: FormGroup;
  message: MessageModel;
  currentCategory: CategoryModel;
  subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private categoriesService: CategoriesService,
              private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.message = new MessageModel('', 'success');
    this.form = this.fb.group({
      selectCategory: [1, [Validators.required]],
      name: [this.categories[0].name, [Validators.required]],
      value: [this.categories[0].capacity, [Validators.required, Validators.min(1)]]
    });

    this.subscriptions.add(
      this.form.get('selectCategory').valueChanges
        .subscribe(result => {
          this.onCategoryChange(result);
        })
    );
  }

  onSubmit(): void {
    const {name, value} = this.form.value;
    const category = new CategoryModel(name, value, this.currentCategory.id);
    this.subscriptions.add(
      this.categoriesService.updateCategory(category)
        .subscribe(result => {
          this.message.text = 'Данные успешно отредактированы!';
          setTimeout(() => {
            this.message.text = '';
          }, 5000);
          this.onCategoryEdit.emit(result);
        })
    );
  }

  onCategoryChange(currentCategoryId: any): void {
    /*Поиск категории по идентификатору*/
    this.currentCategory = this.categories.find(category => category.id === +currentCategoryId);
    /*Устанавливаем значения категории для полей*/
    this.form.patchValue({name: this.currentCategory.name, value: this.currentCategory.capacity});
  }

  /*Проверка невалидности поля*/
  isInvalidField(fieldName: string): boolean {
    return this.utilities.isInvalidField(fieldName, this.form);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
