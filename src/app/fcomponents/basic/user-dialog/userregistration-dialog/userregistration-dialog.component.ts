import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../../service/data.service'
@Component({
  selector: 'app-userregistration-dialog',
  templateUrl: './userregistration-dialog.component.html',
  styleUrls: ['./userregistration-dialog.component.css']
})
export class UserregistrationDialogComponent implements OnInit {
  registrationForm: FormGroup;
  hide = true;
  message: string;
  constructor(private data: DataService, private fb: FormBuilder, public dialogRef: MatDialogRef<UserregistrationDialogComponent>, public dialog: MatDialog) { }
  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
      confirmpassword: ['', [Validators.required]],
    }, {
      validator: this.MustMatch('password', 'confirmpassword')
    });
    this.data.currentloginmessage.subscribe(currentloginmessage => this.message = currentloginmessage)
  }
  getErrorMessage() {
    return this.username.hasError('required') ? 'Please enter a value' :
      this.username.hasError('email') ? 'Not a valid username' : ''
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

  loginDialog() {
    this.dialogRef.close();
    this.data.changeloginMessage("open");
  }

  get username() { return this.registrationForm.get('username') };
  get password() { return this.registrationForm.get('password') };
  get confirmpassword() { return this.registrationForm.get('confirmpassword') };
  get fullname() { return this.registrationForm.get('fullname') };
  onSubmit(value) {
    console.log(value.password, value.confirmpassword);
  }
}

