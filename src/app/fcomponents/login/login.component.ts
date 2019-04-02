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
  fillAll:string
  JWTToken:string;
  user = {
    username: '',
    password:''
  }
  isBrowser:Boolean;

  constructor(
    //@Inject(LOCAL_STORAGE)
    //private localStorage: any,
    @Inject(PLATFORM_ID) private platformId,
    private productservice : ProductService,
    public router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true
    }
   }

  ngOnInit() {
  }

  onSubmit({valid}:{valid: boolean})  {
    console.log(valid)
    //*login failed
    if(!valid) {
      console.log("Dosn't Work");
      this.fillAll = 'All fields must be filled.';
    }
    //*login successfully
    else{
      this.productservice.login(this.user)
      .subscribe((res)=>{
        if (this.isBrowser = true){
          sessionStorage.setItem('access_token',res['token'])
        }
        this.router.navigate(['/admin']);
      },(error)=>{
        console.log(error)
      })
    }
  }
}

  //!login success 
  //set JWT
  //Redirect to admin page

  //!login error
