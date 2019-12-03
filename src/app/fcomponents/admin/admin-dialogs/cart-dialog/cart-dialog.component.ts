import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductService } from '../../../../service/product.service';

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
  contactForm = {
    email: '',
    firstName: '',
    lastName: '',
    message: '',
    phoneNum: ''
  };
  cartForm = {
    location: '',
    plannedTime: '',
    price: 0,
  };
  constructor(
    private dialogRef: MatDialogRef<CartdialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService: ProductService
  ) {
    // fill in contact form
    this.contactForm.email = data.data['contact']['email'];
    this.contactForm.firstName = data.data['contact']['firstName'];
    this.contactForm.lastName = data.data['contact']['lastName'];
    this.contactForm.phoneNum = data.data['contact']['phoneNum'];
    this.contactForm.message = data.data['contact']['message'];
    // fill in cart form
    this.cartForm.location = data.data['location'];
    this.cartForm.plannedTime = data.data['plannedTime'];
    this.cartForm.price  = data.data['price'];

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
    this.isLoading = true;
    this.productService.updateCart(this.displayData.cartId, this.cartForm).subscribe(
      (res) => {
        this.isLoading = false;
        this.dataChanges.emit();
      }, (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  // get the products in shopping cart
  getCartProds() {
    this.productService.getCardProd(this.displayData.cartId).subscribe(
      (res) => {
        this.cartProdList = res;
      }, (error) => {
        console.log(error);
      }
    );
  }
  deleteCardProd(id) {
    this.productService.deleteCartProd(id).subscribe(
      (res) => {
        this.getCartProds();
    }, (error) => {
      console.log(error);
    });
  }


}
