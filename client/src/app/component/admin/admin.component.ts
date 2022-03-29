import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ProductsService } from 'src/app/service/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminEditDialogComponent } from '../admin-edit-dialog/admin-edit-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public _products: ProductsService,
    public _admin: AdminService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    this._products.getAllProducts()

  }



  openDialog(productID: Number) {
    const dialogRef = this.dialog.open(AdminEditDialogComponent);
    console.log(productID);
    localStorage['proid'] = productID
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
