import { Component, OnInit, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../service/product.service'
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-shopping-userinfo',
  templateUrl: './shopping-userinfo.component.html',
  styleUrls: ['./shopping-userinfo.component.css']
})
export class ShoppingUserinfoComponent implements OnInit {
  userContactInfoForm: FormGroup
  feedback_message: string;
  successMessage: string;
  PlannedTime: any;
  isSendingEmail = false;
  isSendSuccess = false;
  isCartEmpty = false;
  isShoppingCartValid = true;
  buttonError = false
  userId: number
  districtSelectControl = false
  districtError = false
  districtSelected: number
  totalPrice = 0
  bondFee = 150
  timetable = []
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
  deliveryFee = 0
  districtName = ''
  minDate: Date
  url: any
  @Output() isPickup = new EventEmitter();
  @Output() district = new EventEmitter();
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
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
    this.minDate = new Date(nowDate2 + offset2 + 13 * 60 * 60 * 1000);
  }

  ngOnInit() {
    if ('userId' in localStorage) {
      this.userId = JSON.parse(localStorage.getItem('userId'))
      this.productService.getProfile(this.userId).subscribe(
        res => {
          console.log(res)
          this.userInfo.Email = res['data'][0].email
          let info = res['data'][0].userInfo//user information
          if (info.length == 1) {
            if (info[0].hasOwnProperty('firstName')) {
              this.userInfo.FirstName = res['data'][0].userInfo[0].firstName
            }
            if (info[0].hasOwnProperty('lastName')) {
              this.userInfo.LastName = res['data'][0].userInfo[0].lastName
            }
            if (info[0].hasOwnProperty('phoneNumber')) {
              this.userInfo.PhoneNum = res['data'][0].userInfo[0].phoneNumber
            }
            if (info[0].hasOwnProperty('company')) {
              this.userInfo.company = res['data'][0].userInfo[0].company
            }
          }

        })
    }
  }


  // check whether form is valid
  onSubmit({ valid }: { valid: boolean }) {
    if (this.userInfo.isPickup != "1" && this.userInfo.isPickup != "0") {
      this.buttonError = true
    } else {
      this.buttonError = false
    }
    if (this.districtSelected == null && this.userInfo.isPickup.localeCompare("0") == 0) {
      this.districtError = true
    } else {
      this.districtError = false
    }
    if (!valid || this.districtError || this.buttonError) {
      this.feedback_message = 'Please check all inputs and fill up the form';
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
      this.calculateDeliveryFee()
      this.calculateBondFee()
      this.submitCart(post);
    }
  }


  calculateDeliveryFee() {
    if (this.districtSelected == 1) {
      this.deliveryFee = 20
      this.districtName = "NorthShoreCity"
    } else if (this.districtSelected == 2) {
      this.deliveryFee = 30
      this.districtName = "AucklandCity"
    } else if (this.districtSelected == 3) {
      this.deliveryFee = 50
      this.districtName = "ManukauCity"
    } else if (this.districtSelected == 4) {
      this.deliveryFee = 40
      this.districtName = "WaitakereCity"
    }
  }
  calculateBondFee() {
    if ('totalPrice' in localStorage) {
      this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    }
    if (this.totalPrice <= 250) {
      this.bondFee = 150
    } else if (this.totalPrice <= 750 && this.totalPrice > 250) {
      this.bondFee = 300
    } else if (this.totalPrice > 750) {
      this.bondFee = 500
    }

  }
  // group data into two groups: cart part and contact part
  submitCart(post) {
    const data = JSON.parse(localStorage.getItem('cartList') || '[]');
    delete data.availableStock;
    delete data.url;
    this.timetable = JSON.parse(localStorage.getItem('productTimetable') || '[]');
    // combine shopping cart data
    const cartData = {
      location: `${this.userInfo.streetAddress}, ${this.userInfo.city}`,
      price: Number(localStorage.getItem('totalPrice')),
      PlannedTime: this.PlannedTime,
      deliveryfee: this.deliveryFee,
      depositfee: this.bondFee,
      ispickup: this.userInfo.isPickup,
      region: this.districtName,
      CartProd: data,
    };
    const cartContact = {
      CartModel: cartData,
      ContactModel: post,
      ProductTimeTableModel: this.timetable
    };
    console.log(cartContact)
    this.addCart(cartContact);
  }
  // pass data to api
  addCart(cartContact) {
    this.isSendingEmail = true;
    this.productService.checkIfAvailable(this.timetable).subscribe(
      (res) => {
        console.log(res)
        if (res['isSuccess']) {
          if ('userId' in localStorage) {
            this.cartUser(cartContact)
          } else {
            this.cartNotUser(cartContact)
          }
        } else {
          this.isSendingEmail = false
          this.feedback_message = 'Please modify your time. Your items are booked.'
        }
      },
      (error) => {
        console.log(error)

      }

    )


  }
  radioButtonChange(input) {
    if (input['value'] == 0) {
      this.districtSelectControl = true
      this.userInfo.isPickup = "0"
      this.isPickup.emit(this.userInfo.isPickup)
    } else if (input['value'] == 1) {
      this.districtSelectControl = false
      this.userInfo.isPickup = "1"
      this.isPickup.emit(this.userInfo.isPickup)
    }
    this.buttonError = false
    this.districtError = false
  }
  selectionChange(input) {
    this.district.emit(input.value)
    this.districtSelected = input.value
    this.districtError = false
  }
  // clear the shopping cart stored in local storage

  cartNotUser(cartContact) {
    console.log(cartContact)
    this.productService.addCart(cartContact).subscribe(
      (res) => {
        console.log(res)
        this.isSendingEmail = false;
        this.isSendSuccess = true;
        console.log(res['data'].cartId)
        localStorage.setItem('cartId', JSON.stringify(res['data'].cartId))
        console.log(JSON.parse(localStorage.getItem('cartId')))
        this.getPaymentUrl(res['data'].cartId)
        //this.router.navigate(['/paymentoptions']);
      },
      (error) => {
        this.isSendingEmail = false;
        console.log(error);
        this.feedback_message = 'Oops, something went wrong.';
      });
  }
  cartUser(cartContact) {
    this.productService.addCartUser(cartContact, this.userId).subscribe(
      (res) => {
        console.log(res)
        this.isSendingEmail = false;
        this.isSendSuccess = true;
        localStorage.setItem('cartId', JSON.stringify(res['data'].cartId))
        console.log(JSON.parse(localStorage.getItem('cartId')))
        this.getPaymentUrl(res['data'].cartId)
        //this.router.navigate(['/paymentoptions']);
      },
      (error) => {
        this.isSendingEmail = false;
        console.log(error);
        this.feedback_message = 'Oops, something went wrong.';
      });
  }
  getPaymentUrl(cartId) {
    this.productService.requestPaymentUrl(cartId).subscribe(
      res => {
        console.log(res['url'])
        window.location.assign(res['url'])
        localStorage.removeItem('productTimetable')
        localStorage.removeItem('cartList')
        localStorage.removeItem('totalPrice')
      },
      err => {
        console.log(err)
      }
    )
  }
} 
