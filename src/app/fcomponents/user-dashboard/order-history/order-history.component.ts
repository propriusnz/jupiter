import { Component, OnInit } from '@angular/core';
import { ItemDetailComponent } from '../../user-dashboard/item-detail/item-detail.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any
  userID = 2
  constructor( 
    public dialog: MatDialog,
    public productService: ProductService
    ) {
 }

  ngOnInit() {
    this.productService.getUserOrdersHistory(this.userID).subscribe(
      (res)=>{console.log(res),
        this.orders = res
      },
      (err)=>{console.warn(err)}
    )
  }

  itemDialog(id) {
    console.log(id)
    this.dialog.open(ItemDetailComponent, {
      width: '850px',
      height: '450px',
      data: id
    });
  }
}
