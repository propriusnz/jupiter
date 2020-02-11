import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductService } from '../../../../service/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartdialogComponent implements OnInit {
  cartId: number;
  contactId: number;
  status: string;
  displayData: any;
  title: string;
  cartProdList: any;
  dataChanges = new EventEmitter();
  isLoading = false;
  isCardProdDeleted = false;
  hasId=false
  contactForm = {
    email: '',
    firstName: '',
    lastName: '',
    message: '',
    phoneNum: ''
  };
  cartForm = {
    cartId: 0,
    location: '',
    eventStartDate: '',
    eventEndDate: '',
    price: 0,
    cartProd: []
  };
  constructor(
    private dialogRef: MatDialogRef<CartdialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService: ProductService
  ) {
    console.log(data.data)
    // fill in contact form
    this.contactForm.email = data.data['contact']['email'];
    this.contactForm.firstName = data.data['contact']['firstName'];
    this.contactForm.lastName = data.data['contact']['lastName'];
    this.contactForm.phoneNum = data.data['contact']['phoneNum'];
    this.contactForm.message = data.data['contact']['message'];
    // fill in cart form
    this.cartForm.location = data.data['location'];
    this.cartForm.cartId = data.data['cartId']
    this.cartForm.eventStartDate = data.data['eventStartDate'];
    this.cartForm.eventEndDate = data.data['eventEndDate'];
    this.cartForm.cartProd = data.data['cartProd']
    this.cartForm.price = data.data['price'];

    this.cartId = data.data['id'];
    this.displayData = data.data;
    this.title = data.title;
    this.status = data.action;
  }

  ngOnInit() {
    this.getCartProds();
  }
  close() {
    this.dialogRef.close();
  }
  updateContact() {
    this.isLoading = true;
    this.productService.updateContacts(this.displayData['contactId'], this.contactForm).subscribe(
      (res) => {
        this.isLoading = false;
        alert('Update contact successfully!');
        this.dataChanges.emit();
      }, (error) => {
        this.isLoading = false;
        console.log(error);
      });
  }
  updateCart() {
    this.cartForm.eventStartDate = this.datetoYMD(this.cartForm.eventStartDate)
    this.cartForm.eventEndDate = this.datetoYMD(this.cartForm.eventEndDate)
    this.isLoading = true;
    console.log(this.cartProdList)
    console.log(this.cartForm)
    
    this.cartForm.cartProd = this.cartProdList
    console.log(this.displayData)
    this.updateDataTransmitted(this.displayData, this.cartForm)
    console.log(this.displayData)
    let tmpDisplayData=this.displayData
    delete tmpDisplayData.cartProd
    delete tmpDisplayData.contact
    console.log(tmpDisplayData)
    const updatedCart={
      CartModel:tmpDisplayData,
      cartProdModel:this.cartForm.cartProd
    }
    console.log(updatedCart)
    this.productService.updateCart(this.displayData.cartId, updatedCart).subscribe(
      (res) => {
        console.log(res)
        this.isLoading = false;
        this.dataChanges.emit();
      }, (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );

  }
  updateDataTransmitted(displayData, cartForm) {
    displayData.eventStartDate = cartForm.eventStartDate
    displayData.eventEndDate = cartForm.eventEndDate
    displayData.price = cartForm.price
    displayData.cartProd = cartForm.cartProd
  }
  updateQuantity(prod, value) {
    prod.quantity = value
    this.cartForm.cartProd = this.cartProdList
    console.log(this.cartForm)
  }
  // get the products in shopping cart
  getCartProds() {
    this.productService.getCardProd(this.displayData.cartId).subscribe(
      (res) => {
        console.log(res)
        this.cartProdList = res;
      }, (error) => {
        console.log(error);
      }
    );
  }
  deleteCardProd(id) {
    console.log(id)
    this.productService.deleteCartProd(id).subscribe(
      (res) => {
        console.log(res)
        this.getCartProds();
      }, (error) => {
        console.log(error);
      });
  }

  datetoYMD(date) {
    console.log(date)
    return moment(date).format('YYYY-MM-DD')
    // // date = date.format()
    // var d = date.getDate();
    // var m = date.getMonth() + 1; //Month from 0 to 11
    // var y = date.getFullYear();
    // return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  searchProdId(prodId) {
    console.log(this.cartProdList)
    if(prodId){
      this.productService.showProduct(prodId).subscribe(
      res => {
        console.log(res)
        this.checkIfHasId(res)
        this.addNewProd(res)
        // const newCartProd = {
        //   id: res.data,
        //   cartId:null,
        //   prodId:
        //   price:
        //   title:
        //   subTitle:
        //   quantity:
        //   cart:
        //   prod:
        // }
      },
      err => {
        console.log(err)
      }
    )
    }
    
  }
  checkIfHasId(res) {
    if(res.productDetail.length==0){
      this.hasId=false
    }else{
      this.hasId=true
    }
  }
  addNewProd(res){
    
  }
}
