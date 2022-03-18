import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    public _products: ProductsService,
    public _fb:FormBuilder,

  ) { }

  form: FormGroup =this._fb.group({
    search:[""]
  })

  public counter = 0
  localStorage = localStorage['cartID']
  value = '';

  ngOnInit(): void {
    this._products.getAllProducts()
  }

  countPlus() {
    this.counter++
  }

  countMinus() {
    if (this.counter <= 0) {
      this.counter = 0
    } else {
      this.counter--
    }
  }

  public clearSearch() {
    this._products.isSearching = false;
    
  }
}
