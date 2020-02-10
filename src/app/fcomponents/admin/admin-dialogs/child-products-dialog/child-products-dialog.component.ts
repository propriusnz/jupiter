import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductService } from "src/app/service/product.service";
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
  orderBeginDate: any;
  beginDates = [];
  orderEndDate = [];

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
	 	i ++;
	   };
  }

  ngOnInit() {}
  
  getDetailProductTime(id) {
	const isDetailId = 1;
	this.currentDate = new Date();
	const beginDate = this.currentDate;
	this.productservice.getProductTimeTable(id, isDetailId, this.datetoYMD(beginDate)).subscribe(
		productOrderDetail => {
            console.log('product Time List: ', productOrderDetail);
            console.log(Object.keys(productOrderDetail));

            // Below, Loop through object to get order begin date & end date
            Object.keys(productOrderDetail).forEach((key) => {
                let i = 0;
                // while (i <= key.length) {

                // }
                this.orderBeginDate = productOrderDetail[key]['beginDate'];
                console.log('orderBeginDate:', this.orderBeginDate, typeof(this.orderBeginDate));
            })
        },
        err => {
            console.log(err);
        }
    ),
    this.beginDates.push(this.orderBeginDate);
    console.log('Begin Dates:', this.beginDates, typeof(this.beginDates));
	// console.log(this.datetoYMD(this.currentDate));
  }

  getOrderTime() {
    
  }

  checkIfBetweenBeginEndDates() {
    this.datetoYMD(this.chosenDate);
    
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