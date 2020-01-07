import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchService } from 'src/app/service/match.service';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.css']
})
export class ManagePasswordComponent implements OnInit {
	changePasswdForm: FormGroup;
	hide = true;
	errorMesage = '';
	changeFailed = true;

  constructor(
	private fb: FormBuilder, 
	private matchservice: MatchService
  ) { }

  ngOnInit() {
	this.changePasswdForm = this.fb.group({
		oldpassword: ['', [Validators.required, 			
			    		   Validators.minLength(8), 
						   Validators.maxLength(20), 
						   Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
		password: ['', [Validators.required, 			
						Validators.minLength(8), 
						Validators.maxLength(20), 
						Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
		confirmpassword: ['', [Validators.required]],
	  }, {
		validator: this.matchservice.MustMatch('password', 'confirmpassword')
	  })
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

  update () {
	this.changeFailed = false;
  }
  
  get password() { return this.changePasswdForm.get('password') };

  get confirmpassword() { return this.changePasswdForm.get('confirmpassword') };
}