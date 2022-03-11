import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public _products: ProductsService
  ) { }


  async addProduct(body: { form }) {
    const res = await fetch('http://localhost:1000/admin', {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      credentials: "include"
    })
    const data = await res.json()

    if (data.err) {
      alert(data.err)
    } else {
      this._products.getAllProducts()
    }
    console.log(data);

  }

  async updateProduct(body: { form }) {
    const res = await fetch('http://localhost:1000/admin', {
      method: "put",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      credentials: "include"
    })
    const data = await res.json()

    if (data.err) {
      alert(data.err)
    } else {
      this._products.getAllProducts()
    }
    console.log(data);

  }

}
