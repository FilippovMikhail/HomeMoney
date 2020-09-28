import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BillModel} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable({providedIn: 'root'})

export class BillService extends BaseApi {

  constructor(protected http: HttpClient) {
    super(http);
  }

  /*Получение счета*/
  getBill(): Observable<BillModel> {
    return this.get('bill');
  }

  /*Обновление счета*/
  updateBill(bill: BillModel): Observable<BillModel> {
    return this.put('bill', bill);
  }

  /*Получение валют*/
  getCurrency(): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=959190e7fffb49dff6f958b6556e9945&symbols=EUR,USD,RUB`);
  }
}
