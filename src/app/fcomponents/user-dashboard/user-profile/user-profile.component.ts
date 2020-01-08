import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	updateProfileForm: FormGroup;

  constructor(
	  private fb: FormBuilder,
  ) { }

  ngOnInit() {
	  this.updateProfileForm = this.fb.group({
		  fname: ['', [Validators.required,
						Validators.minLength(1),
						 Validators.maxLength(20),]],
		  lname: ['', []],
		  email: ['', []],
		  phone: ['', []],
		  company: ['', []],
		  subscribe: ['',]
	  })
  }

  get fname() {
	  return this.updateProfileForm.get('fname');
  }
  
  get lname() {
	return this.updateProfileForm.get('lname');
  }

  get email() {
	return this.updateProfileForm.get('email');
  }

  get phone() {
	return this.updateProfileForm.get('phone');
  }

  get company() {
	return this.updateProfileForm.get('company');
  }

  get subscribe() {
	return this.updateProfileForm.get('subscribe');
  }
}
