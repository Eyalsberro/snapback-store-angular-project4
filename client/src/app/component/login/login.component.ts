import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public _order: OrderService
  ) { }

  hide = true;
  form: FormGroup = this._fb.group({
    email:["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  })

  ngOnInit(): void {


  }

}
