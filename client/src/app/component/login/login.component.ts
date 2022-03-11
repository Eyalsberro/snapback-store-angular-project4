import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public _user:UserService,
    public _fb:FormBuilder,
  ) { }

  hide = true;
  form:FormGroup= this._fb.group({
    email:"",
    password:""
  })  

  ngOnInit(): void {

   
  }

}
