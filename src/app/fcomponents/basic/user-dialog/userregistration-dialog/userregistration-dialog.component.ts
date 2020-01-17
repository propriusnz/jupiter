import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../../service/data.service'
import { ProductService } from '../../../../service/product.service';
import { MatchService } from 'src/app/service/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userregistration-dialog',
  templateUrl: './userregistration-dialog.component.html',
  styleUrls: ['./userregistration-dialog.component.css']
})

export class UserregistrationDialogComponent implements OnInit {
  registrationForm: FormGroup;
  hide = true;
  message: string;
  subscribe: number;
  errorMessage = '';
  signupFailed = false;

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserregistrationDialogComponent>,
    public dialog: MatDialog,
    private productservice: ProductService,
    private matchservice: MatchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,
      ]],
      password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
      confirmpassword: ['', [Validators.required]]
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


  onSubmit() {
    let user = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      isSubscribe: this.subscribe
    }
    console.log(user);
    this.productservice.register(user).subscribe(
      res => {
        console.log(res);
<<<<<<< HEAD
        this.dialogRef.close();
        this.redirect();
      },
      err => {
        if (err.hasOwnProperty('error')) {
          console.log("hahaha")
          if (err.error.hasOwnProperty('errorMessage')) {
            this.errorMessage = err.error.errorMessage
=======
		this.dialogRef.close();
		// this.redirect();
      },
      err => {
        if(err.hasOwnProperty('error')){
          if(err.error.hasOwnProperty('errorMessage')){
            this.errorMessage=err.error.errorMessage
>>>>>>> 6c92129d1bd7925ad9154407cdad9d9c93a5a3d2
          }
        } else {
          this.errorMessage = "Sign up failed, Internal Server Error"
        }
<<<<<<< HEAD

        console.log(err)
        this.signupFailed = true

=======
        console.log(err);
        this.signupFailed = true;
>>>>>>> 6c92129d1bd7925ad9154407cdad9d9c93a5a3d2
      }
    );
  }
  onSlideChange(subscribe) {
    if (subscribe.checked) {
      this.subscribe = 1;
    } else {
      this.subscribe = 0;
    }
  }

  redirect() {
    this.router.navigate(['userDashboard'])
  }
}