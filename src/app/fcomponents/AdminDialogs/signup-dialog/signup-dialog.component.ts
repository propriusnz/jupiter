import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {
  registrationForm:FormGroup;
  hide=true;
  nameErrorMessage="Please enter valid username"
  constructor(private fb:FormBuilder){}
  ngOnInit() {
    this.registrationForm=this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100),Validators.pattern('[a-zA-Z ]*')]],
    })
    
  }
    
}
