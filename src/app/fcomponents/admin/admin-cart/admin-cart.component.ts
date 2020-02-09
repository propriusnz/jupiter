import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CartdialogComponent } from '../admin-dialogs/cart-dialog/cart-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-admin-cart',
  templateUrl: './admin-cart.component.html',
  styleUrls: ['./admin-cart.component.css']
})
export class AdminCartComponent implements OnInit {
  displayedCartData: any;
  showData = false
  isLoading = false;
  feedbackMessage: string;
  singleCartData: any;
  showSingleCart = false
  searchForm: FormGroup
  baseUrl = environment.baseUrl;
  // isDataChanged = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      phone: [''],
      eventdate: [''],
      firstname: ['']
    })
    this.getCartData();
  }

  getCartData() {
    this.isLoading = true;
    this.productService.getCarts().subscribe(
      (res) => {
        this.displayedCartData = res;
        if (this.displayedCartData.length >= 1) {
          this.showData = true
          this.showSingleCart = false
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.feedbackMessage = 'Server Error!';
      }
    );

  }

  deleteCart(data) {
    const id = data.cartId;
    if (confirm('Are you sure you want to delete this Cart?')) {
      this.productService.deleteCart(id).subscribe(
        (res) => {
          this.getCartData();
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        });
    }
  }

  openCart(data) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '720px';
    dialogConfig.width = '1200px';
    dialogConfig.data = {
      id: 1,
      title: 'Cart Detail',
      data: data,
      action: 'update'
    };
    const dialogRef = this.dialog.open(CartdialogComponent, dialogConfig);
    let isDataChanged = false;
    const sub = dialogRef.componentInstance.dataChanges.subscribe(() => {
      isDataChanged = true;
    });
    dialogRef.afterClosed().subscribe(() => {
      if (isDataChanged === true) {
        this.getCartData();
        console.log('data refreshed');
      }
    });
  }
  searchOrderId(orderId) {
    if (orderId) {
      this.productService.getCartStatus(orderId).subscribe(
        (res) => {
          console.log(res)
          if (res) {
            this.showData = false
            this.showSingleCart = true
            this.singleCartData = res
          } else {
            this.showData = false
            this.showSingleCart = false
          }
        },
        (error) => {
          console.log(error);
          this.feedbackMessage = 'Server Error!';
        }
      );
    } else {
      this.showData = true
      this.showSingleCart = false
    }
  }
  update(value) {
    console.log('testtest')
    if (!value) {
      this.showData = true
      this.showSingleCart = false
    }else{
      this.showData=false
      this.showSingleCart=true
    }
    

  }
  onSubmit() {
    this.showData = true
    this.showSingleCart = false
    console.log(this.searchForm.value.phone)
    const phone = this.searchForm.value.phone
    let eventdate = (this.searchForm.value.eventdate)
    const firstname = this.searchForm.value.firstname
    if (this.searchForm.value.eventdate) {
      eventdate = this.datetoYMD(this.searchForm.value.eventdate)
      this.http.get(this.baseUrl + '/Carts/GetCartByFilter?phoneNumber=' + phone + '&eventDate=' + eventdate + '&firstName=' + firstname).subscribe(
        res => {
          this.displayedCartData=res
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    } else if(!this.searchForm.value.eventdate){
      this.http.get(this.baseUrl + '/Carts/GetCartByFilter?phoneNumber=' + phone +'&firstName=' + firstname).subscribe(
        res => {
          this.displayedCartData=res
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    }

    }
  
datetoYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
}
