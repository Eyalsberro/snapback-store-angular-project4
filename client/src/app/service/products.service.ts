import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public router:Router) { }

  productsArr = []
  countProduct =[]
  categoriesArr = []
  cartArr = []

  async getAllProducts(){
    const res = await fetch(`http://localhost:1000/products`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.productsArr= data;
    
  }
  
  async countAllProducts(){
    const res = await fetch(`http://localhost:1000/products/count`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.countProduct= data;
    
  }
  
  async searchProducts(body:{form}){
    const res = await fetch('http://localhost:1000/search',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if(res.status == 400){
      alert(data.err)
    }else{
      this.getAllProducts()
    }
  }

  async getAllCategories(){
    const res = await fetch(`http://localhost:1000/categories`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.categoriesArr= data;
    
  }

  async getCategoryByID(id:number){
    const res = await fetch(`http://localhost:1000/categories/${id}`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.getAllProducts()
    
  }

  // CART SECTION //
  
  async getCartOfCustomer(id:number){
    const res = await fetch(`http://localhost:1000/cart/${id}`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.cartArr= data;
    
  }

  async addACart(user_id:number){
    const res = await fetch('http://localhost:1000/cart/addcart',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify({user_id}),
      credentials: "include"
    })
    const data = await res.json()
    if(res.status == 400){
      alert(data.err)
    }
    console.log(data);
    
  }

  async addToCart(qt:number,product_id:number, cart_id:number){
    const res = await fetch('http://localhost:1000/cart/addtocart',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify({qt, product_id,cart_id}),
      credentials: "include"
    })
    const data = await res.json()
    if(res.status == 400){
      alert(data.err)
    }
    console.log(data);
    
  }
  
  async deleteProFromCart(cardid:number ,productid:number){
    const res = await fetch(`http://localhost:1000/cart/delete/${cardid}/${productid}`,{
      method:'DELETE',
      credentials:"include"
    })
    const data = await res.json()
    console.log(data.msg)

  }

  async deleteAllProFromCart(cardid:number){
    const res = await fetch(`http://localhost:1000/cart/deleteall/${cardid}`,{
      method:'DELETE',
      credentials:"include"
    })
    const data = await res.json()
    console.log(data.msg)

  }

  async getCartDate(id:number){
    const res = await fetch(`http://localhost:1000/cart/cartdate/${id}`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    
    
  }



}
