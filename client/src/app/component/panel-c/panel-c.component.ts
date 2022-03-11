import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-panel-c',
  templateUrl: './panel-c.component.html',
  styleUrls: ['./panel-c.component.css']
})
export class PanelCComponent implements OnInit {

    
    constructor(public _products:ProductsService) { }

  ngOnInit(): void {

    this._products.countAllProducts()
  }

}
