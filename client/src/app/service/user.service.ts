import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public router:Router) { }
  err: string = "";
  localstorage = "";
  userinfo= [];
  allinfoArr =[];
  public isLogged = false

  async login(body: { form }) {
    const res = await fetch('http://localhost:1000/users/login', {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      credentials: "include"
    })
    const data = await res.json()
    console.log(data);
    
    if (data.err) {
      this.err = data.err
    } else {
      this.err = ""
      this.isLogged = true
      localStorage['email'] = data.user[0].email
      localStorage['userID'] = data.user[0].userID
      localStorage['role'] = data.user[0].role
      this.localstorage = localStorage.getItem('email') || '{}'
      window.location.reload()
      
    }
  }


  async logout(){
    const res = await fetch('http://localhost:1000/users/logout',{
      method:'DELETE',
      credentials:"include"
    })
    const data = await res.json()
    // console.log(data)
    this.router.navigate(['/login']);
    localStorage.removeItem('email')
    localStorage.removeItem('userID')
    localStorage.removeItem('role')
    localStorage.removeItem('cartID')
    localStorage.removeItem('proid')
    this.localstorage= ""
    window.location.reload()
    
    
  }

  async register(body:{form}){
    const res = await fetch('http://localhost:1000/users/register',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if(res.status == 400){
      this.err = data.err
    }else{
      this.err=""
      this.router.navigate(['/login']);
      console.log(data)
    }
  }

  async getUserData(id:number){
    const res = await fetch(`http://localhost:1000/users/${id}`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.userinfo= data;
    
  }
 
  async getAllUsersInfo(){
    const res = await fetch(`http://localhost:1000/users/userallinfo`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.allinfoArr= data;
    
  }


  


















}
