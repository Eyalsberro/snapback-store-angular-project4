import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor() { }

  opened: boolean = true;
  
  localStorageadmin = localStorage['role']

  ngOnInit(): void {
  }

}
