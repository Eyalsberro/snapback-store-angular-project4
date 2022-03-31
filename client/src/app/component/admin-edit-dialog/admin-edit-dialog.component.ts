import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-admin-edit-dialog',
  templateUrl: './admin-edit-dialog.component.html',
  styleUrls: ['./admin-edit-dialog.component.css']
})
export class AdminEditDialogComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _admin: AdminService,
    public _products: ProductsService
  ) { }

  ngOnInit(): void {
  }

  localStorageproid = localStorage['proid']


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
