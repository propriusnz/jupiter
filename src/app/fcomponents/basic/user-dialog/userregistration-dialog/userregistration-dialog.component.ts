import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserloginDialogComponent } from '../userlogin-dialog/userlogin-dialog.component';

@Component({
  selector: 'app-userregistration-dialog',
  templateUrl: './userregistration-dialog.component.html',
  styleUrls: ['./userregistration-dialog.component.css']
})
export class UserregistrationDialogComponent implements OnInit {
  registrationForm:FormGroup;
  hide=true;
  nameErrorMessage="Please enter valid username";
  passwordvalue="adsfadf";
  constructor(private fb:FormBuilder, public dialogRef:MatDialogRef<UserregistrationDialogComponent>, public dialog: MatDialog){}
  ngOnInit() {
    this.registrationForm=this.fb.group({
      username: ['', [Validators.required, Validators.email,Validators.minLength(8)]],
      password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      confirmpassword:['',[Validators.required]],
    },{validator:this.MustMatch('password','confirmpassword')
  }); 
    
  }
  getErrorMessage() {
    return this.username.hasError('required') ? 'Please enter a value' :
		this.username.hasError('email') ? 'Not a valid username' : '' 
  }

  getErrorMessage2(){
    return this.password.hasError('required') ? 'Please enter a value' :
    this.password.hasError('minlength') ? 'Please enter at least 8 characters' :
    this.password.hasError('maxlength') ? 'Please enter no more than 20 characters' :''
  }

  getErrorMessage3(){
    return this.confirmpassword.hasError('required') ? 'Please enter a value': this.confirmpassword.hasError('notSame') ? 'Password does not match' : ''
  }

  MustMatch(controlName:string,matchingControlName:string){
    return(group:FormGroup)=>{
      const control=group.controls[controlName];
      const matchingControl=group.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.notSame){
        //return if another validator has already found an error on the matchingControl
        return;
      }
      //set error on matchingControl if validation fails
      if(control.value!==matchingControl.value){
        matchingControl.setErrors({notSame:true});
      }else{
        matchingControl.setErrors(null);
      }
    };
  }

  loginDialog() {
	this.dialogRef.close()
    this.dialog.open(UserloginDialogComponent, {
      width: '400px',
      height: '650px',
    });
  }
  
  get username(){return this.registrationForm.get('username')};
  get password(){return this.registrationForm.get('password')};
  get confirmpassword(){return this.registrationForm.get('confirmpassword')};
  onSubmit(value){
    console.log(value.password,value.confirmpassword);
  }
}

