import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../service/product.service';

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

  constructor(
	private fb: FormBuilder, 
	private productservice: ProductService
  ) { }

  ngOnInit() {
	this.resetPasswordForm = this.fb.group({
		password: ['', [Validators.required, 			
						Validators.minLength(8), 
						Validators.maxLength(20), 
						Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
		confirmpassword: ['', [Validators.required]],
	}, {
	validator: this.MustMatch('password', 'confirmpassword')
	});
  }

  get password() { 
	  return this.resetPasswordForm.get('password') 
  };
  get confirmpassword() { 
	  return this.resetPasswordForm.get('confirmpassword') 
  };

  MustMatch(controlName: string, matchingControlName: string) {
    return (group: FormGroup) => {
      const control = group.controls[controlName];
      const matchingControl = group.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.notSame) {
        //return if another validator has already found an error on the matchingControl
        return;
      }
      //set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ notSame: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

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
}
