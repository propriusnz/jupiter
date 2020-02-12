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
  prodId: number;
  minDate: Date; // Start date of calender
  maxDate: Date;
  startMoment: any; // Start date of monment.js date array
  endMoment: any;
  currentDate: Date;

  constructor(
	private productservice: ProductService,
    private dialogRef: MatDialogRef<ChildProductsDialogComponent>,
	@Inject(MAT_DIALOG_DATA) data
  ) {
	this.childProducts = data.data['productDetail'];
	this.productName = data.data.title;
	this.prodId = data.data.prodId;
	this.minDate = new Date;
	this.minDate.setDate(this.minDate.getDate() - 90);
	this.maxDate = new Date();
	this.maxDate.setDate(this.maxDate.getDate() + 90);
	this.startMoment = moment(new Date()).subtract(60, 'days');
	this.endMoment = moment(new Date()).add(30, 'days');
  }

  ngOnInit() {}
  
  getDetailProductTime(id) {
	let isDetailId;
	if (this.childProducts[0]) {
		isDetailId = 1;
	} else {
		isDetailId = 0;
	}
	this.currentDate = new Date();
	const beginDate = this.currentDate;
	this.productservice.getProductTimeTable(id, isDetailId, this.datetoYMD(beginDate)).subscribe(
		productOrderDetail => {
            console.log('ChildProd Time List: ', productOrderDetail);
            // Loop through object to get order begin date & end date
            Object.keys(productOrderDetail).forEach((key) => {
			
            })
        },
        err => {
            console.log('Server Error!', err);
        }
	)
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