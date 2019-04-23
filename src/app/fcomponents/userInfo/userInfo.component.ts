import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.css']
})
export class UserInfoComponent implements OnInit {
  feedback_message:string;
  successMessage:string;
  PlannedTime:any;
  isSendingEmail:boolean = false;
  isSendSuccess:boolean  = false;
  isCartEmpty:boolean = false;
  userInfo={
    FirstName:'',
    LastName:'',
    Email:'',
    PhoneNum:'',
    company:'',
    streetAddress:'',
    city:'',
    Message:''
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService:ProductService,
    private router: Router,
    ) {
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('cartList') === '' || localStorage.getItem('cartList') == null) {
          this.isCartEmpty = true
        }}
     }

  ngOnInit() {
  }

  onSubmit({valid}:{valid:boolean}) {
    if(!valid){
      this.feedback_message = 'Please check all inputs.'
    }
    else{
      //combine user info data
      let { FirstName, LastName, PhoneNum, Email, Message} = this.userInfo
      let post = {
        FirstName: FirstName,
        LastName: LastName,
        PhoneNum: PhoneNum,
        Email: Email,
        Message: Message
      }
      this.submitCart(post)
    }
  }

  submitCart(post){
      let data = JSON.parse(localStorage.getItem("cartList") || "[]");

    // combine shopping cart data
    let cartdata = {
      location: `${this.userInfo.streetAddress}, ${this.userInfo.city}`,
      price:Number(localStorage.getItem('totalPrice')),
      PlannedTime: this.PlannedTime,
      CartProd: data
    };
    let cartContact = {
      CartModel: cartdata,
      ContactModel: post
    };
    this.addCart(cartContact)
  }
  //call api
  addCart(cartContact){
    this.isSendingEmail = true
    this.productService.addCart(cartContact).subscribe(
      (res)=>{
        this.isSendingEmail = false
        this.isSendSuccess = true
        this.router.navigate(['/thankYou']);
        this.cleanStorage()
      },
      (error)=>{
        this.isSendingEmail = false
        console.log(error)
        this.feedback_message = 'Oops, something went wrong.'
      });

  }
  //clear the shopping cart stored in local storage
  cleanStorage(){
    localStorage.clear()
  }

}
