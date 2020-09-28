import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: BillModel;
  @Input() currency: any;

  usd: number;
  rub: number;

  constructor() { }

  ngOnInit(): void {
    const {USD, RUB} = this.currency.rates;
    this.usd = USD * this.bill.value;
    this.rub = RUB * this.bill.value;
    console.log(this.currency);
  }

}
