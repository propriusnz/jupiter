import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginFailed: Boolean = false;
  loginFailedMessage: string;
  fillAll: string;
  JWTToken: string;
  user = {
    username: '',
    password: ''
  };
  isBrowser: Boolean;
  errorMessage: string;
  isLoggingIn: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productservice: ProductService,
    public router: Router,
  ){
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
   }

  ngOnInit() {
    
  }

  onSubmit({valid}: { valid: boolean})  {
    this.errorMessage = null
    this.loginFailed = false;
    // when form is not valid
    if (!valid) {
      this.errorMessage = 'All fields must be filled.';
    } else {
      this.isLoggingIn = true
      this.productservice.login(this.user)
      .subscribe((res) => {
        // when login successful
        this.isLoggingIn = false
        if (this.isBrowser = true) {
          sessionStorage.setItem('access_token', res['token']);
          let timeStamp=new Date()
          timeStamp.setMinutes(timeStamp.getMinutes()+120)
          sessionStorage.setItem('timeStamp',timeStamp.toISOString())
        }
        this.router.navigate(['/admin'])
      }, (error) => {
        // when login failed
        console.log(error);
        this.isLoggingIn = false
        this.loginFailed = true;
        // return failed message
        if (error['status'] === 401) {
          this.errorMessage = 'Incorrect Password or Username.';
        } else {
          this.errorMessage = 'Server Error.';
        }

      });
    }
  }
}