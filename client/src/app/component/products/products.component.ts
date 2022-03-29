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
    public _fb: FormBuilder,

  ) { }

  form: FormGroup = this._fb.group({
    search: [""]
  })

  localStorage = localStorage['cartID']

  ngOnInit(): void {
    this._products.getAllProducts()
  }

  
  getProductQt(productID: number) {
    if (this._products.cartArr.length > 0) {
      if (this._products.cartArr.find((p) => p.productID == productID)) {
        return this._products.cartArr.find((p) => p.productID == productID).qt;
      }
    }
    return 0;

  }

  addToCart(qt: number, product_id: number, cart_id: number) {
    if (this.getProductQt(product_id) > 0) {
      this._products.plus({ product_id, cart_id });
    } else {
      this._products.addToCart(qt, product_id, cart_id);
    }
  }

  removeProitemFromCart(qt: number, product_id: number, cart_id: number) {
    if (this.getProductQt(product_id) > 1) {
      this._products.minus({ product_id, cart_id });
    } else {
      this._products.addToCart(qt, product_id, cart_id);
    }
  }

  public clearSearch() {
    this._products.isSearching = false;

  }
}
