import {Pipe, PipeTransform} from '@angular/core';

import {EventModel} from '../models/event.model';

@Pipe({
  name: 'appFilter'
})

export class FilterPipe implements PipeTransform {
  transform(items: EventModel[], value: string, field: string): any {

    if (items.length === 0 || !value) {
      return items;
    }

    const newItems = items.filter(item => {

      /*Копируем объект, чтобы при изменении исходный объект не изменился*/
      const copyItem = Object.assign({}, item);

      if (!isNaN(copyItem[field])) {
        /*Переводим в строку*/
        copyItem[field] += '';
      }

      if (field === 'type') {
        /*Меняем поисковую строку*/
        copyItem[field] = copyItem[field] === 'income' ? 'доход' : 'расход';
      }

      /*Переопределим поисковое поле*/
      if (field === 'category')
      {
        copyItem[field] = copyItem['categoryName'];
      }

      /*Метод вернет позицию первого совпадения, а если оно не найдено, то -1*/
      return copyItem[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;

    });
    return newItems;
  }
}
