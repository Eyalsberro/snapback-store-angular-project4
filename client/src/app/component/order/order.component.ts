import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public _products: ProductsService,
    ) { }

  ngOnInit(): void {
    this._products.getCartOfCustomer(localStorage['userID'])
  }


  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this._products.cartArr.length; i++) {
      sum += this._products.cartArr[i].Total
    }
    let roundedString = sum.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  };
}
