import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  
  items: any
  orderID: any
  // id: number
  constructor(
    public productService: ProductService,
    @Inject(MAT_DIALOG_DATA) data,
  ) { 
    console.log(data)
    this.orderID = data

    this.items = [{
      item: "Corsage",
      quantity: "2",
      price: "$0.00",
      id: 200
  },
  {
      item: "White Roman Column Pillar&White Tall Stone Look Urns",
      quantity: "3",
      price:"$20.00",
      id: 237
  },
  {
      item: "Wedding Chair set",
      quantity: "10",
      price:"$148",
      id: 177
  },
  {
      item: "Party Package 2",
      quantity: "1",
      price:"$349",
      id: 148
  }]
  // this.id = 200;
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
