import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserregistrationDialogComponent } from '../userregistration-dialog/userregistration-dialog.component'
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'

@Component({
  selector: 'app-userlogin-dialog',
  templateUrl: './userlogin-dialog.component.html',
  styleUrls: ['./userlogin-dialog.component.css']
})
export class UserloginDialogComponent implements OnInit {
  hide = true;   //Hide password by default
  userLoginForm: FormGroup; 

  constructor(private fb: FormBuilder, public dialogRef:MatDialogRef<UserloginDialogComponent>, public dialog: MatDialog) { }

  ngOnInit() {
	  this.userLoginForm = this.fb.group({
		email: ['', [Validators.required,
					 Validators.email]],
		password: ['', [Validators.required,
					  Validators.minLength(8),
					  Validators.maxLength(20)]]
	  })
  }
  
  getEmailErrorMessage() {
	return this.email.hasError('required') ? 'Please enter your email' :
		this.email.hasError('email') ? 'Please enter a valid email address with @' : 
		'';
  }

  getPasswordErrorMessage() {
	return this.password.hasError('required') ? 'Please enter your password' :
		this.password.hasError('minlength' || 'maxlength') ? 'Your password should be 8-20 characters' :
		'';
  }

  forgotDialog() {
	this.dialogRef.close();
	this.dialog.open(ForgotPasswordComponent, {
		width: '300px',
		height: '450px',
	});
  }
  
  signupDialog() {
	this.dialogRef.close();
    this.dialog.open(UserregistrationDialogComponent, {
      width: '400px',
      height: '650px'
	});
  }
  
  get email() {
	  return this.userLoginForm.get('email');
  }

  get password() {
	  return this.userLoginForm.get('password');
  }

  onSubmit() {
	  console.log(this.userLoginForm);
  }
}
