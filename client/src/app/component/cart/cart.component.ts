import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public _products: ProductsService, public router: Router) { }

  localStorage = localStorage['cartID'];

  ngOnInit(): void {
    this._products.getCartOfCustomer(localStorage['userID'])
  }


  // getSum(): number {
  //   let sum = 0;
  //   for (let i = 0; i < this._products.cartArr.length; i++) {
  //     sum += this._products.cartArr[i].Total
  //   }
  //   let roundedString = sum.toFixed(2);
  //   let rounded = Number(roundedString);
  //   return rounded;
  // };


  


}
