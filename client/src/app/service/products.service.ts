import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public router: Router) { }

  productsArr = []
  countProduct = []
  categoriesArr = []
  cartArr = []
  CartLastDate
  searchArr = []
  allproducts: boolean
  isSearching: boolean
  err: string = "";

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.cartArr.length; i++) {
      sum += this.cartArr[i].Total
    }
    let roundedString = sum.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  };

  async getAllProducts() {
    const res = await fetch(`http://localhost:1000/products`, {
      credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    this.productsArr = data;
    this.allproducts = true
    this.isSearching = false
  }

  async countAllProducts() {
    const res = await fetch(`http://localhost:1000/products/count`, {
      credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    this.countProduct = data;

  }

  async searchProducts(body: { form }) {
    const res = await fetch('http://localhost:1000/products/search', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (res.status == 400) {
      alert(data.err)
    } else {
      console.log(data);
      this.searchArr = data
      this.isSearching = true
    }
  }

  async getAllCategories() {
    const res = await fetch(`http://localhost:1000/categories`, {
      credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    this.categoriesArr = data;

  }

  async getCategoryByID(id: number) {
    const res = await fetch(`http://localhost:1000/categories/${id}`, {
      credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    this.categoriesArr = data;
    this.allproducts = false
    this.isSearching = false

  }

  // CART SECTION //

  async getCartOfCustomer(id: number) {
    const res = await fetch(`http://localhost:1000/cart/${id}`, {
      credentials: "include"
    })
    const data = await res.json()
    // console.log(data)
    // localStorage['cartID'] = data[0].cartID;
    this.cartArr = data;
    

  }

  async addACart(user_id: number) {
    const res = await fetch('http://localhost:1000/cart/addcart', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user_id }),
      credentials: "include"
    })
    const data = await res.json()
    console.log(data);
    localStorage['cartID'] = data.insertId
    window.location.reload()
    if (res.status == 400) {
      alert(data.err)
    }
  }

  async addToCart(qt: number, product_id: number, cart_id: number) {
    const res = await fetch('http://localhost:1000/cart/addtocart', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ qt, product_id, cart_id }),
      credentials: "include"
    })
    const data = await res.json()
    console.log(data);
    this.getCartOfCustomer(localStorage['userID'])
    if (res.status == 400) {
      this.err = data.err
    }
    
  }


  async plus(body: { product_id: number, cart_id: number }) {
    const res = await fetch('http://localhost:1000/cart/plus', {
      method: 'Put',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      this.getCartOfCustomer(localStorage['userID'])
    }
  }

  async minus(body: { product_id: number, cart_id: number }) {
    const res = await fetch('http://localhost:1000/cart/minus', {
      method: 'Put',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      this.getCartOfCustomer(localStorage['userID'])
    }
  }


  async deleteProFromCart(cardid: number, productid: number) {
    const res = await fetch(`http://localhost:1000/cart/delete/${cardid}/${productid}`, {
      method: 'DELETE',
      credentials: "include"
    })
    const data = await res.json()
    console.log(data.msg)
    this.getCartOfCustomer(localStorage['userID'])
  }

  async deleteAllProFromCart(cardid: number) {
    const res = await fetch(`http://localhost:1000/cart/deleteall/${cardid}`, {
      method: 'DELETE',
      credentials: "include"
    })
    const data = await res.json()
    console.log(data.msg)
    this.getCartOfCustomer(localStorage['userID'])
  }

  async getCartDate(id: number) {
    const res = await fetch(`http://localhost:1000/cart/cartdate/${id}`, {
      credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    this.CartLastDate = data


  }



}
