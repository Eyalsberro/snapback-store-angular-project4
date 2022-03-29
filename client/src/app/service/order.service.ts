import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }


  lastOrderOfUser = []
  countAllOrder = []
  orderArr = []

  async getLastOrder(id: number) {
    const res = await fetch(`http://localhost:1000/orders/last/${id}`, {
      credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    this.lastOrderOfUser = data


  }

  async countAllOrders() {
    const res = await fetch(`http://localhost:1000/orders/count`, {
      credentials: "include"
    })
    const data = await res.json()
    console.log(data)
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
    console.log(data);

  }


  async createReceipt(body: { content: string }) {
    console.log(body);
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
    console.log(res);
    if (!res.ok) {
      return alert('מצטערים לא יכולנו להפיק קבלה עבורך כעת אנא צור קשר בהתאם');
    }
    window.open('http://localhost:1000/orders/downloadReceip', "_blank");
    // this.closeShopppingCart();
  }



  async deleteCartAfterOrder(id: number) {
    const res = await fetch(`http://localhost:1000/orders/deletecart/${id}`, {
      method: 'DELETE',
      credentials: "include"
    })
    const data = await res.json()
    console.log(data.msg)

  }

}
