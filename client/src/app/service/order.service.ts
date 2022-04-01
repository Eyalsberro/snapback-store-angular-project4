import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    public _products:ProductsService
  ) { }


  lastOrderOfUser
  countAllOrder = []
  orderArr = []
  searchArr = []
  isSearching: boolean

  async getLastOrder(id: number) {
    const res = await fetch(`http://localhost:1000/orders/last/${id}`, {
      credentials: "include"
    })
    const data = await res.json()
    this.lastOrderOfUser = data


  }

  async countAllOrders() {
    const res = await fetch(`http://localhost:1000/orders/count`, {
      credentials: "include"
    })
    const data = await res.json()
    this.countAllOrder = data;

  }

  async makeOrder(body: { form }) {
    const res = await fetch('http://localhost:1000/orders', {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      credentials: "include"
    })
    const data = await res.json()

    if (data.err) {
      alert(data.err)
    } else {
      this.orderArr = data
    }

  }


  async createReceipt(body: { content: string }) {
    const res = await fetch('http://localhost:1000/orders/receipt', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
  }

  async downloadReceipt() {
    const res = await fetch('http://localhost:1000/orders/downloadReceip', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) {
      return alert('מצטערים לא יכולנו להפיק קבלה עבורך כעת אנא צור קשר בהתאם');
    }
    window.open('http://localhost:1000/orders/downloadReceip', "_blank");
  }



  async CloseCartAfterOrder(cartid: number) {
    const res = await fetch(`http://localhost:1000/orders/closecart/${cartid}`, {
      method: 'PUT',
      credentials: "include"
    })
    const data = await res.json()
    localStorage.removeItem('cartID')

  }

  async searchCart(id: number, body: { form }) {
    const res = await fetch(`http://localhost:1000/cart/${id}/search`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (res.status == 400) {
      alert(data.err)
    } else {
      this._products.getCartOfCustomer(localStorage['userID'])
      this.isSearching = true
      this.searchArr = data
      
    }
  }

}
