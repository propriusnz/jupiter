import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'
import { DataService } from '../../../../service/data.service'
import { ProductService } from '../../../../service/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserregistrationDialogComponent } from '../userregistration-dialog/userregistration-dialog.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-userlogin-dialog',
  templateUrl: './userlogin-dialog.component.html',
  styleUrls: ['./userlogin-dialog.component.css']
})

export class UserloginDialogComponent implements OnInit {
  hide = true;   //Hide password by default
  userLoginForm: FormGroup;
  message: string;
  user = {
    Email: '',
    Password: ''
  };
  loggedinfailed = false;
  errorMessage = '';
  snackBarmessage = 'Log in successful, welcome!';
  snackBaraction = 'x';

  public router: Router;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private data: DataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserloginDialogComponent>,
    public dialog: MatDialog,
    private productservice: ProductService,
    private _LoggedIn_snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {return;  }

    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required,
      			   Validators.email]],
      password: ['', [Validators.required,
      				  Validators.minLength(5),
      				  Validators.maxLength(30)]]
    })
    this.data.currentsignupmessage.subscribe(currentsignupmessage => this.message = currentsignupmessage);
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Please enter your email' : this.email.hasError('email') ? 'Please enter a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Please enter your password' :
      this.password.hasError('minlength || maxlength') ? 'Your password should be 8-20 characters' :
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
    this.data.changesignupMessage("open")

  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  update() {
    this.loggedinfailed = false;
  }

  onSubmit() {
    this.user = {
      Email: this.userLoginForm.value.email,
      Password: this.userLoginForm.value.password
    }
    console.log(this.user);
    this.productservice.userlogin(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('userId', JSON.stringify(res['data'].userId));
        localStorage.setItem('userToken', JSON.stringify(res['data'].token));
        this.dialogRef.close();
        this.openSnackBar(this.snackBarmessage, this.snackBaraction);
        location.reload();
        
      },
      err => {
        console.log(err);
        this.loggedinfailed = true;
        this.errorMessage = "Incorrect Password or Email";
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._LoggedIn_snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}