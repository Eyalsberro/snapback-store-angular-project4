import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

  constructor( public _fb: FormBuilder,
    public _admin: AdminService) { }

  ngOnInit(): void {
  }

  categeory = [
    {
      id: 1,
      cat: "Cities"
    },
    {
      id: 2,
      cat: "Hip-Hop"
    },
    {
      id: 3,
      cat: "Animated"
    },
    {
      id: 4,
      cat: "Beach Vibe"
    }
  ];


  form: FormGroup = this._fb.group({
    productName: ["", Validators.required],
    category_id: ["", Validators.required],
    price: ["", Validators.required],
    img: ["", Validators.required]
  })

}
