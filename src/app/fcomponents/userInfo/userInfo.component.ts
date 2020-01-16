import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.css']
})
export class UserInfoComponent implements OnInit {
  feedback_message: string;
  successMessage: string;
  PlannedTime: any;
  isSendingEmail = false;
  isSendSuccess = false;
  isCartEmpty = false;
  isShoppingCartValid = true;
  userId: number
  districtSelectControl=false
  districtSelected:number
  userInfo = {
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNum: '',
    company: '',
    streetAddress: '',
    city: '',
    Message: '',
    District: '',
    isPickup: ''
  };
  //Delievery fee
  NorthShoreCity = 30
  AucklandCity = 20
  ManukauCity = 40
  WaitakereCity = 50
  minDate: Date
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService,
    private router: Router,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('cartList') === '' || localStorage.getItem('cartList') == null) {
        this.isCartEmpty = true;
      }
    }
    // subscribe the status of shopping cart
    this.productService.getShoppingCartStatus().subscribe(
      status => { this.isShoppingCartValid = status.isValid; }
    );
    let offset2 = new Date().getTimezoneOffset() * 60 * 1000;
    let nowDate2 = new Date().getTime();
    this.minDate = new Date(nowDate2 + offset2);
  }

  ngOnInit() {
    if ('userId' in localStorage ) {
      this.userId = JSON.parse(localStorage.getItem('userId'))
      this.productService.getProfile(this.userId).subscribe(
        res => {
          console.log(res)
          this.userInfo.Email = res['data'][0].email
          if(res['data'].length!=0){
          if(res['data'].hasOwnProperty('firstName')){
          this.userInfo.FirstName = res['data'][0].userInfo[0].firstName
          }else if(res['data'].hasOwnProperty('lastName')){
            this.userInfo.LastName = res['data'][0].userInfo[0].lastName
          }else if(res['data'].hasOwnProperty('phoneNumber')){
            this.userInfo.PhoneNum = res['data'][0].userInfo[0].phoneNumber
          }else if(res['data'].hasOwnProperty('company'))
          this.userInfo.company = res['data'][0].userInfo[0].company
          }
        }
      )
    }
  }
  // check whether form is valid
  onSubmit({ valid }: { valid: boolean }) {
    if (!valid) {
      this.feedback_message = 'Please check all inputs.';
    } else {
      // combine user info data
      const { FirstName, LastName, PhoneNum, Email, Message } = this.userInfo;
      const post = {
        FirstName: FirstName,
        LastName: LastName,
        PhoneNum: PhoneNum,
        Email: Email,
        Message: Message
      };
      this.submitCart(post);
    }
  }
  // group data into two groups: cart part and contact part
  submitCart(post) {
    const data = JSON.parse(localStorage.getItem('cartList') || '[]');
    delete data.availableStock;
    delete data.url;
    // combine shopping cart data
    const cartData = {
      location: `${this.userInfo.streetAddress}, ${this.userInfo.city}`,
      price: Number(localStorage.getItem('totalPrice')),
      PlannedTime: this.PlannedTime,
      deliveryfee: 20,
      depositfee: 90,
      ispickup: 1,
      region: "CBD",
      CartProd: data,
    };
    const cartContact = {
      CartModel: cartData,
      ContactModel: post,
      ProductTimeTableModel: 0//to do here 
    };
    this.addCart(cartContact);
  }
  // pass data to api
  addCart(cartContact) {
    this.isSendingEmail = true;
    this.productService.addCart(cartContact).subscribe(
      (res) => {
        this.isSendingEmail = false;
        this.isSendSuccess = true;
        this.router.navigate(['/thankYou']);
        this.cleanStorage();
      },
      (error) => {
        this.isSendingEmail = false;
        console.log(error);
        this.feedback_message = 'Oops, something went wrong.';
      });

  }
  radioButtonChange(input){
    this.userInfo.isPickup=input['value']
    if(input['value']==0){
      this.districtSelectControl=true
    }else if(input['value']==1){
      this.districtSelectControl=false
    }
  }
  // clear the shopping cart stored in local storage
  cleanStorage() {
    localStorage.clear();
  }

}
