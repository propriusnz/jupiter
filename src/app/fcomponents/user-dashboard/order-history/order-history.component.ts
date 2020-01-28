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
  // 这userid是向后端取的,也是product service那里带过来，这userid为 2
  constructor( 
    public dialog: MatDialog,
    public productService: ProductService
    ) {
  //   this.orders = [{
  //     eventAddress: "19 William Roberts Road, Pakuranga, Auckland 2010",
  //     dateOfEvent: "08 January 2020",
  //     items : 1,
  //     price: "$1889.00",
  //     paymentStatus: "Paid",
  //     orderStatus: "Collected"
  // },
  // {
  //     eventAddress: "8 Cortina Place, Pakuranga, Auckland 2010",
  //     dateOfEvent: "10 January 2020",
  //     items : 2,
  //     price: "$1889.00",
  //     paymentStatus: "Unpaid",
  //     orderStatus: "Not Collected"
  // },
  // {
  //     eventAddress: "25 Kilkenny Drive, Dannemora, Auckland 2016",
  //     dateOfEvent: "12 January 2020",
  //     items : "Order 3",
  //     price: "$1889.00",
  //     paymentStatus: "Expired",
  //     orderStatus: "Collected"
  // },
  // {
  //     eventAddress: "36-46 Lagoon Drive, Panmure, Auckland 1072",
  //     dateOfEvent: "15 January 2020",
  //     items : "Order 4",
  //     price: "$1889.00",
  //     paymentStatus: "Paid",
  //     orderStatus: "Returned"
  // }]
 }

  ngOnInit() {
    this.productService.getUserOrdersHistory(this.userID).subscribe(
      // 从productservice哪里找getUserOrdersHistory，然后找userid, 意思是2，然后订阅
      (res)=>{console.log(res),
        this.orders = res
        //res是response,是向后端请求获取的资料,同一时间也要看后端的反应是什么
      },
      (err)=>{console.warn(err)}
      // 如果请求失败，那就会显示error
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
