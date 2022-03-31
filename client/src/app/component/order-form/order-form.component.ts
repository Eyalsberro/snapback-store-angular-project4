import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { UserService } from 'src/app/service/user.service';
import { CreditCardValidators } from 'angular-cc-library';
import { OrderService } from 'src/app/service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';



@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  constructor(
    public _products: ProductsService,
    public _user: UserService,
    public _fb: FormBuilder,
    public _order: OrderService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._user.getUserData(localStorage['userID'])
  }

  error = "";
  minDate = new Date().toISOString().split('T')[0]

  form: FormGroup = this._fb.group({
    cart_id: localStorage.getItem('cartID'),
    user_id: localStorage.getItem('userID'),
    sendCity: ["", Validators.required],
    sendStreet: ["", Validators.required],
    sendDate: ["", Validators.required],
    pay4digit: ["", [Validators.required, CreditCardValidators.validateCCNumber]],

  })

  fillCity() {
    // console.log(this._user.userinfo[0].city);
    this.form.value.sendCity = this._user.userinfo[0].city
    this.form.controls["sendCity"].setValue(this._user.userinfo[0].city)
  }

  fillStreet() {
    // console.log(this._user.userinfo[0].street);
    this.form.value.sendCity = this._user.userinfo[0].street
    this.form.controls["sendStreet"].setValue(this._user.userinfo[0].street)
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 5 && day !== 6;
  };

  openDialog() {
    const dialogRef = this.dialog.open(OrderDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  makeOrder() {
   

    if (this.form.value.sendCity && this.form.value.sendStreet && this.form.value.sendDate && this.form.value.pay4digit) {
      if (this.form.controls["pay4digit"].valid) {
        this._order.makeOrder(this.form.value)
        this.openDialog()
      } else {
        this.error = "Credit card number is incorrect";
      }
    } else {
      this.error = "All fields are required";

    }
  }

}
