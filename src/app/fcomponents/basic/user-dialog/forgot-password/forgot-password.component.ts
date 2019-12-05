import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserloginDialogComponent } from '../userlogin-dialog/userlogin-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
	  this.forgotPasswordForm = this.fb.group({
		  email:['', [Validators.required,
					  Validators.email]]
	  })
  }

  get email() {
	return this.forgotPasswordForm.get('email');
  }

  getEmailErrorMessage() {
	return this.email.hasError('required') ? 'Please enter your email' :
		this.email.hasError('email') ? 'Please enter a valid email address with @' : 
		'';
  }

  onSubmit() {
	console.log(this.forgotPasswordForm);
  }

}
