import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailsentDialogComponent } from '../emailsent-dialog/emailsent-dialog.component';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  user={
    Email: String
  }
  loggedinfailed=false;
  errorMessage='';
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ForgotPasswordComponent>, public dialog: MatDialog,private productservice: ProductService) { }

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
    this.user = {
      Email: this.forgotPasswordForm.value.email,
    }
    console.log(this.user);
    this.productservice.userlogin(this.user).subscribe(
      res => {
        console.log(res)
        this.dialogRef.close()
      },
      err => {
        console.log(err)
        this.loggedinfailed = true
        this.errorMessage = "Incorrect Email"
      }
    );
  }
  opendialog(){
    this.dialogRef.close();
    this.dialog.open(EmailsentDialogComponent, {
      width: '500px',
      height: '250px'
    });
  }
  
  update(){
    this.loggedinfailed=false;
  } 
}
