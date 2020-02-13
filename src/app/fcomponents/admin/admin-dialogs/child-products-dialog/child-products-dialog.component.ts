import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { ProductService } from "src/app/service/product.service";
import * as moment from 'moment';
import { AdminHireCalendarDialogComponent } from '../admin-hire-calendar-dialog/admin-hire-calendar-dialog.component';

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
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ChildProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data)
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

  ngOnInit() { }

  getDetailProductTime(id) {
	let isDetailId;
	if (this.childProducts[0]) {
		isDetailId = 1;
	} else {
		isDetailId = 0;
	}
	this.currentDate = new Date();
  const beginDate = this.currentDate;
  console.log(id)
	this.productservice.getProductTimeTable(id, isDetailId, this.datetoYMD(beginDate)).subscribe(
		productOrderDetail => {
            console.log('ChildProd Time List: ', productOrderDetail);
            this.openCalendarDialog(productOrderDetail);
            // Object.keys(productOrderDetail).forEach((key) => {})
        },
        err => {
            console.log('Server Error!', err);
        }
	)
  }

  openCalendarDialog(x){
    const dialogConfig = new MatDialogConfig();
	  dialogConfig.autoFocus = false;
	  dialogConfig.maxHeight = '720px';
	  dialogConfig.width = '800px';
	  dialogConfig.data = {
		  data: x
	  }
	  this.dialog.open(AdminHireCalendarDialogComponent, dialogConfig);
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