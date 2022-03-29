import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ProductsService } from 'src/app/service/products.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  constructor(public _order: OrderService, public _user: UserService, public _products: ProductsService) { }

  localStorage = localStorage['userID'];

  contentOfReceipt =
    '\r\n' + this._user.userinfo[0].firstName + "'s " + 'Receipt:' + '\r\n';

    

  ngOnInit(): void {
    this._products.getCartOfCustomer(localStorage['userID'])

    this._products.cartArr.forEach((product) => {
      this.contentOfReceipt += '\r\n' + '\r\n';
      this.contentOfReceipt += 'Product: ' + product.productName + '   ';
      this.contentOfReceipt += 'qt: ' + product.qt + '   ';
      this.contentOfReceipt += 'Price: ' + product.price + ' $' + '   ';
      this.contentOfReceipt += 'Sum: ' + product.price * product.qt + ' $' + '   ';
    });

    this.contentOfReceipt += '\r\n';
    this.contentOfReceipt += '\r\n';
    this.contentOfReceipt += 'Total: ' + this._products.getSum() + ' $' + '   ';
    this._order.createReceipt({ content: this.contentOfReceipt })
  }

}
