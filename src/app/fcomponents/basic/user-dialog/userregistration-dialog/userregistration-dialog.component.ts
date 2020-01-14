import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../../service/data.service'
import { ProductService } from '../../../../service/product.service';
import { MatchService } from 'src/app/service/match.service';

@Component({
  selector: 'app-userregistration-dialog',
  templateUrl: './userregistration-dialog.component.html',
  styleUrls: ['./userregistration-dialog.component.css']
})

export class UserregistrationDialogComponent implements OnInit {
  registrationForm: FormGroup;
  hide = true;
  message: string;
  subscribe: boolean;
  errorMessage = '';
  signupFailed = false;

  constructor (
	private data: DataService, 
	private fb: FormBuilder, 
	public dialogRef: MatDialogRef<UserregistrationDialogComponent>, 
	public dialog: MatDialog,
    private productservice: ProductService,
    private matchservice: MatchService
	) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
	  email: ['', [Validators.required, Validators.email,  
		           Validators.minLength(8)]],
	  password: ['', [Validators.required, 			
					  Validators.minLength(8), 
					  Validators.maxLength(20), 
					  Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
      confirmpassword: ['', [Validators.required]],
    }, {
      validator: this.matchservice.MustMatch('password', 'confirmpassword')
    });
      this.data.currentloginmessage.subscribe(currentloginmessage => this.message = currentloginmessage)
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Please enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : ''
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

  loginDialog() {
    this.dialogRef.close();
    this.data.changeloginMessage("open");
  }

  get email() { return this.registrationForm.get('email') };
  get password() { return this.registrationForm.get('password') };
  get confirmpassword() { return this.registrationForm.get('confirmpassword') };

  update () {
	  this.signupFailed = false;
  }

  onSubmit() {
	let user = {
		email: this.registrationForm.value.email,
      	password: this.registrationForm.value.password,
    	isSubscribe: this.subscribe
	}
	console.log(user);
	this.productservice.register(user).subscribe(
		res => {
			console.log(res)
			this.dialogRef.close()
		},
		err => {
			console.log(err)
			this.signupFailed = true
			this.errorMessage = "Sign up failed"
		}
	);
  }
  onSlideChange(subscribe){
    if(subscribe.checked){
      this.subscribe = true;
    }else{
      this.subscribe = false;
    }
    console.log(this.subscribe)
  }
}