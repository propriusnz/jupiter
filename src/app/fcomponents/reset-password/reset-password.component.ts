import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../service/product.service';
import { MatchService } from 'src/app/service/match.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup;
	hide = true;
	errorMessage = '';
	resetFailed = false;
  user={
    Email:String,
  }
  constructor(
	private fb: FormBuilder, 
  private matchservice: MatchService,
  private _resetpasswordservice: ProductService
  ) { }

  ngOnInit() {
	this.resetPasswordForm = this.fb.group({
		password: ['', [Validators.required, 			
						Validators.minLength(8), 
						Validators.maxLength(20), 
						Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
		confirmpassword: ['', [Validators.required]],
	}, {
	validator: this.matchservice.MustMatch('password', 'confirmpassword')
	});
  }

  get password() { 
	  return this.resetPasswordForm.get('password') 
  };
  get confirmpassword() { 
	  return this.resetPasswordForm.get('confirmpassword') 
  };

  getErrorMessage2() {
    return this.password.hasError('required') ? 'Please enter a value' :
    this.password.hasError('minlength') ? 'Please enter at least 8 characters' :
    this.password.hasError('maxlength') ? 'Please enter no more than 20 characters' :
   	this.password.hasError('pattern') ? 'Please use combination of letters and characters' : ''
  }

  getErrorMessage3() {
    return this.confirmpassword.hasError('required') ? 'Please enter a value' : this.confirmpassword.hasError('notSame') ? 'Password does not match' : ''
  }

  update () {
	this.resetFailed = false;
  }
  onSubmit(){
    this.user = {
      Email: this.resetPasswordForm.value.email
    }
    this._resetpasswordservice.resetpassword(this.user).subscribe(
      res => {
        console.log(res)
        console.log(res['data'])
        console.log(typeof(res))
        if (res['isSuccess']===false) {
          this.resetFailed = true
          this.errorMessage = "Reset Failed"
        }else{
          console.log(res)
        }
      },
      err => {
        console.log(err)
      }
    );
  }
}