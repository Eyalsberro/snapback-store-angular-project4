import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { ProductsService } from 'src/app/service/products.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  email: boolean

  constructor(
    public _user: UserService,
    public _fb: FormBuilder,
    public _products: ProductsService,
    public _order: OrderService,
    public router: Router
  ) { }

  localStorageadmin = localStorage['role']

  hide = true;
  form: FormGroup = this._fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  })

  ngOnInit(): void {
    this._products.getCartOfCustomer(localStorage['userID'])
    // localStorage.getItem('cartID')
  }

  getUnclosedCartOfUser() {
    this._products.getCartOfCustomer(localStorage['userID'])
    localStorage['cartID'] = this._products.cartArr[0].cartID
    this.router.navigate(['/shop'])
  }

  getToAdmin() {
    this.router.navigate(['/shop'])
  }



  addACartTOuser() {
    this._products.addACart(localStorage['userID'])
    this.router.navigate(['/shop'])
    // localStorage.getItem('cartID')
    // localStorage['cartID'] = this._products.cartArr[0].cartID
  }

}
