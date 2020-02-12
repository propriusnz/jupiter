import { Component, OnInit, Inject, HostListener, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductService } from "src/app/service/product.service";
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

@Component({
  selector: "app-child-products-dialog",
  templateUrl: "./child-products-dialog.component.html",
  styleUrls: ["./child-products-dialog.component.css"]
})

export class ChildProductsDialogComponent implements OnInit {
  childProducts: object;
  productName: string;
  minDate: Date; // Start date of calender
  maxDate: Date;
  startMoment: any; // Start date of monment.js date array
  endMoment: any;
  emptyDates = []; // Days with no bookings at all
  allDates = []; // All dats between minDate & maxDate;
  currentDate: Date;
  chosenDate: Date;
  order = [];
  orders = [];

  constructor(
    private productservice: ProductService,
    private dialogRef: MatDialogRef<ChildProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {

    this.childProducts = data.data['productDetail'];
    this.productName = data.data.title;
    this.minDate = new Date;
    this.minDate.setDate(this.minDate.getDate() - 90);
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.startMoment = moment(new Date()).subtract(60, 'days');
    this.endMoment = moment(new Date()).add(30, 'days');
    this.allDates.push(this.startMoment.toDate().toString()); // Push begin date (day1)
    let i = 1;
    while (i <= 90) {
      let day = this.startMoment.add(i, 'days');
      this.allDates.push(day.toDate().toString());
      i++;
    };
  }
  // Style viewchild
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;

  // Styles function
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }

  ngOnInit() { }

  getDetailProductTime(id) {
    const isDetailId = 1;
    this.currentDate = new Date();
    const beginDate = this.currentDate;
    this.productservice.getProductTimeTable(id, isDetailId, this.datetoYMD(beginDate)).subscribe(
      productOrderDetail => {
        console.log('ChildProd Time List: ', productOrderDetail);
        // Loop through object to get order begin date & end date
        Object.keys(productOrderDetail).forEach((key) => {
          let chosenDayHaveOrder: boolean = moment(this.chosenDate).isBetween(
            productOrderDetail[key]['beginDate'],
            productOrderDetail[key]['endDate']);
          // if (chosenDayHaveOrder = true) {
          // }

          // this.order.push(productOrderDetail[key]['cartId'], productOrderDetail[key]['beginDate'], productOrderDetail[key]['endDate'],
          // 				productOrderDetail[key]['quantity']);
          // this.orders.push(this.order);
          // this.beginDates.push(productOrderDetail[key]['beginDate']);
          // console.log('orderBeginDate:', this.orderBeginDate, typeof(this.orderBeginDate));
          // this.endDates.push(productOrderDetail[key]['endDate']);
        })
      },
      err => {
        console.log('Server Error!', err);
      }
    )
    // console.log('Orders: ', this.orders);
    // console.log('Begin Dates:', this.beginDates, typeof(this.beginDates));
    // console.log('End Dates:', this.endDates, typeof(this.endDates));
    // console.log(this.datetoYMD(this.currentDate));
  }

  onValueChange(value: Date) {
    this.chosenDate = value;
  }

  datetoYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  close() {
    this.dialogRef.close();
  }
}