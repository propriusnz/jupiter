import { Component, OnInit } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Inject } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
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
  constructor(
    //@Inject(LOCAL_STORAGE)
    //private localStorage: any,
    private productservice : ProductService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({valid}:{valid: boolean})  {
    console.log(this.user);
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
        console.log(res)
        sessionStorage.setItem('access_token',res['token'])
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
