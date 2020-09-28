import {Pipe, PipeTransform} from '@angular/core';
/*Импортируем из библиотеки Moment все в переменную moment*/
import * as moment from 'moment';
@Pipe({
  name: 'appMoment'
})

export class MomentPipe implements PipeTransform {
  transform(value: string, formatFrom: string, formatTo: string = 'd MMMM yy'): string {
    return moment(value, formatFrom).format(formatTo);
  }
}
