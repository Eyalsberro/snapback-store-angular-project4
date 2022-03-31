import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public _products: ProductsService,
    public _fb: FormBuilder,
    public _order:OrderService
  ) { }

  ngOnInit(): void {
    this._products.getCartOfCustomer(localStorage['userID'])
  }

  form: FormGroup = this._fb.group({
    search: [""]
  })

  localStorage = localStorage['userID']


  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this._products.cartArr.length; i++) {
      sum += this._products.cartArr[i].Total
    }
    let roundedString = sum.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  };

  clearSearch(){
    this.form.reset()
    this._products.getCartOfCustomer(localStorage['userID'])
    this._order.isSearching = false
  }
}
