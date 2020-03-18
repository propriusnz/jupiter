import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  
  items: any
  orderID: any
  constructor(
    public productService: ProductService,
    @Inject(MAT_DIALOG_DATA) data,
  ) { 
    // console.log(data)
    this.orderID = data
  }

  ngOnInit() {
    this.productService.getUserOrderHistory(this.orderID).subscribe(
      (res)=>{console.log(res),
      this.items = res['cartProd']
    },
      (err)=>{console.warn(err)}
    )
  
  }

}
