import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../service/product.service';
import { AdminPanelService } from '../../../service/admin-panel.service';
import { ProductdialogComponent } from '../admin-dialogs/product-dialog/product-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { setTheme } from 'ngx-bootstrap/utils';
import * as moment from 'moment';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productTypeId: string;
  displayedProductData: any;
  isLoading = false;
  productTitle: string;
  childProducts: any;
  subscription: Subscription;
  searchField: FormControl = new FormControl();
  minDate: Date; // Start date of calender
  maxDate: Date;
  startMoment: any; // Start date of monment.js date array
  endMoment: any;
  allDates = []; // All dats between minDate & maxDate;
  emptyDates = []; // Days with no bookings at all
  ProductTime: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private adminPanelService: AdminPanelService
  ) { 
	  this.minDate = new Date;
		  this.minDate.setDate(this.minDate.getDate() - 90);
		//   console.log('minDate: ', this.minDate, typeof(this.minDate));
	  this.maxDate = new Date();
	  	  this.maxDate.setDate(this.maxDate.getDate() + 90);
	  this.startMoment = moment(new Date()).subtract(60, 'days');
	//   console.log('Before: ', this.startMoment, typeof(this.startMoment));
	  this.endMoment = moment(new Date()).add(30, 'days');
	//   this.endMoment = moment(this.endMoment, "DD-MMM-YYYY");
	//  console.log('After: ', this.startMoment, typeof(this.startMoment));
	   this.allDates.push(this.startMoment.toDate().toString()); // Push begin date (day1)
	   let i = 1;
	   while (i <= 90) {
		 let day = this.startMoment.add(i, 'days');
	 	this.allDates.push(day.toDate().toString());
	 	i ++;
	   };
	   console.log(this.allDates);
    }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.productTypeId = this.route.snapshot.params['productTypeId'];
        this.getProductData(this.productTypeId);
        this.searchField.reset();
      }
    );
    this.getDefaultTitle();
    this.subscription = this.adminPanelService.currentPanel.subscribe(res => this.productTitle = res);
    const searchProduct$ = this.liveSearchProduct();
	this.subscription.add(searchProduct$);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getDefaultTitle() {
    this.productService.getProductType().toPromise().then(typeNameList => {
      const selectedElement = Object.values(typeNameList).find(item => item.prodTypeId === Number(this.productTypeId));
      this.adminPanelService.changePanel(selectedElement.typeName);
    });
  }
  getProductData(typeId: string) {
    this.isLoading = true;
    this.productService.indexType(Number(typeId)).subscribe(
      (res) => {
        this.isLoading = false;
        this.displayedProductData = res['data'];
        // console.log('ProductList:', res);
        this.childProducts = res['data'][0]['productDetail'];
        // console.log('Child Product List: ', this.childProducts);
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  openProduct(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = '750px';
    dialogConfig.width = '750px';
    dialogConfig.data = {
      id: 1,
      title: 'Update Product',
      data: data,
      action: 'update',
      blockCode: this.productTypeId
    };
    const dialogRef = this.dialog.open(ProductdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getProductData(this.productTypeId);
    });
  }

  createProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = '750px';
    dialogConfig.width = '750px';

    dialogConfig.data = {
      id: 1,
      title: 'Create Product',
      action: 'create',
      blockCode: this.productTypeId
    };
    const dialogRef = this.dialog.open(ProductdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getProductData(this.productTypeId);
    });
  }

  deleteProduct(data) {
    const id = data.prodId;
    if (confirm('Are you sure you want to delete this Product?')) {
      this.productService.deleteProduct(id).subscribe(
        (res) => {
          this.getProductData(this.productTypeId);
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        }
      );
    }
  }

  liveSearchProduct() {
    return this.searchField.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((query) => query ?
        this.productService.searchProducts(Number(this.productTypeId), query) : this.productService.indexType(Number(this.productTypeId)))
    ).subscribe(result => this.displayedProductData = result['data']);
  }

  getDetailProductTime(id) {
	const isDetailId = 1;
	const beginDate = this.minDate;
	this.productService.getProductTimeTable(id, isDetailId, this.datetoYMD(beginDate)).subscribe(
		productTimeTable => {
			console.log('product Time List: ', productTimeTable);
			this.ProductTime = productTimeTable;
			
		}
	)
  }

  datetoYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
}