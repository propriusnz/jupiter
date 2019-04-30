import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  subscription: Subscription;
  userInfo = {
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNum: '',
    company: '',
    streetAddress: '',
    city: '',
    Message: ''
  };
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService,
    private router: Router,
    ) {
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('cartList') === '' || localStorage.getItem('cartList') == null) {
          this.isCartEmpty = true;
        }}
        // subscribe the status of shopping cart
        this.subscription = this.productService.getShoppingCartStatus().subscribe(
          status => { this.isShoppingCartValid = status.isValid; }
          );
     }

  ngOnInit() {}
  // check whether form is valid
  onSubmit({valid}: {valid: boolean}) {
    if (!valid) {
      this.feedback_message = 'Please check all inputs.';
    } else {
      // combine user info data
      const { FirstName, LastName, PhoneNum, Email, Message} = this.userInfo;
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
      CartProd: data
    };
    const cartContact = {
      CartModel: cartData,
      ContactModel: post
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
  // clear the shopping cart stored in local storage
  cleanStorage() {
    localStorage.clear();
  }

}
