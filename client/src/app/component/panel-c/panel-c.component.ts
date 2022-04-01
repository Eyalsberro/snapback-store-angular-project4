import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductsService } from 'src/app/service/products.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-panel-c',
  templateUrl: './panel-c.component.html',
  styleUrls: ['./panel-c.component.css']
})
export class PanelCComponent implements OnInit {

    
    constructor(public _products:ProductsService , public _order:OrderService, public _user:UserService, public _admin:AdminService) { }

    localstorge = localStorage['userID']
  ngOnInit(): void {

    this._admin.getAdmin()
    this._products.countAllProducts()
    this._order.countAllOrders()
    this._products.getCartDate(localStorage['userID'])
    this._order.getLastOrder(localStorage['userID'])
    this._user.getUserData(localStorage['userID'])
    
  }

}
