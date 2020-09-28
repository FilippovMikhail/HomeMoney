import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class Utilities {

  /*Проверка невалидности поля*/
  public isInvalidField(fieldName: string, form: FormGroup): boolean {
    const control = form.controls[fieldName];
    return control.invalid && control.touched;
  }

}
