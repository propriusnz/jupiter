import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    public router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
   }

  ngOnInit() {
  }

  onSubmit({valid}: { valid: boolean})  {
    this.errorMessage = null
    this.loginFailed = false;
    // *login failed
    if (!valid) {
      this.errorMessage = 'All fields must be filled.';
    } else {
      this.isLoggingIn = true
      this.productservice.login(this.user)
      .subscribe((res) => {
        this.isLoggingIn = false
        if (this.isBrowser = true) {
          sessionStorage.setItem('access_token', res['token']);
        }
        this.router.navigate(['/admin'])
      }, (error) => {
        console.log(error);
        this.isLoggingIn = false
        this.loginFailed = true;
        if (error['status'] === 401) {
          this.errorMessage = 'Incorrect Password or Username.';
        } else {
          this.errorMessage = 'Server Error.';
        }

      });
    }
  }
}
