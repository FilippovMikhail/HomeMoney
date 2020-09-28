import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, concat, range, merge, combineLatest, ReplaySubject, pipe} from 'rxjs';
import {delay, take, takeUntil} from 'rxjs/operators';

import {BillService} from '../shared/services/bill.service';
import {BillModel} from '../shared/models/bill.model';


@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  currency: any;
  bill: BillModel;

  isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    )
      .subscribe((data: [BillModel, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
      }));
  }

  onRefresh(): void {
    this.isLoaded = false;
    this.subscriptions.add(this.billService.getCurrency()
      .pipe(delay(2000))
      .subscribe(currency => {
        this.currency = currency;
        console.log(currency);
        this.isLoaded = true;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
