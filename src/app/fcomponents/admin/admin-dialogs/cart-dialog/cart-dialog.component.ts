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
  rentalFeesPaid: number
  depositFeesPaid: number
  deliveryFees: number
  rentalFees: number
  depositFees: number
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
    this.rentalFeesPaid = data.data['rentalPaidFee']
    this.depositFeesPaid = data.data['depositPaidFee']
    this.deliveryFees = data.data['deliveryFee']
    this.rentalFees = data.data['price']
    this.depositFees = data.data['depositFee']
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



    this.updateDataTransmitted(this.displayData, this.cartForm)

    let tmpDisplayData = this.displayData
    tmpDisplayData.rentalPaidFee = this.rentalFeesPaid
    tmpDisplayData.depositPaidFee = this.depositFeesPaid
    tmpDisplayData.deliveryFee = this.deliveryFees
    delete tmpDisplayData.cartProd
    delete tmpDisplayData.contact
    const updatedCart = {
      CartModel: tmpDisplayData,
      cartProdModel: this.cartProdList
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
  searchProdId(prodId, detailId) {
    console.log(prodId)
    console.log(detailId)
    console.log(this.cartProdList)
    if (prodId) {
      this.productService.showProduct(prodId).subscribe(
        res => {
          console.log(res)
          this.addCartByProdId(res, detailId)
        },
        err => {
          console.log(err)
        }

      )
    }


  }
  checkIfHasId(res) {
    if (res.productDetail.length > 0) {
      return true
    } else {
      return false
    }

  }
  addCartByProdId(res, detailId) {
    const hasId = this.checkIfHasId(res)
    if (!detailId && !hasId) {
      const newCartProd = {
        cartId: this.cartForm.cartId,
        prodId: res.prodId,
        price: res.price,
        title: res.title,
        subTitle: res.subtitle,
        quantity: 1,
      }
      this.callPostCartProdAPI(newCartProd)
    } else if (detailId && hasId) {
      this.addCartByDetailId(res, detailId)

    }
  }
  addCartByDetailId(res, detailId) {
    const detailIdTitle = this.getDetailIdTitle(res, detailId)
    if(detailIdTitle){
    const newCartProd = {
      cartId: this.cartForm.cartId,
      prodId: res.prodId,
      price: res.price,
      title: detailIdTitle,
      subTitle: res.subtitle,
      quantity: 1,
      prodDetailId: detailId
    }
    this.callPostCartProdAPI(newCartProd)
  }


  }

  getDetailIdTitle(res, detailId) {
    console.log(detailId)
    for (let i = 0; i < res.productDetail.length; i++) {
      if (detailId == res.productDetail[i].id) {
        return res.title + ': ' + res.productDetail[i].productDetail1
      }
    }
    return false
  }
  callPostCartProdAPI(newCartProd) {

    const newCartProdList = []
    newCartProdList.push(newCartProd)
    console.log(newCartProdList)
    this.productService.addCartProd(newCartProdList).subscribe(
      res => {
        console.log(res)
        if (res['isSuccess']) {
          this.cartProdList.push(newCartProd)
          this.getCartProds();
        }

      },
      err => {
        console.log(err)
      }
    )
  }
}