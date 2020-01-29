import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
	profileForm: FormGroup;
	userProfile: object;
	errorMessage = '';

  	constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ProfileDialogComponent>,
		private productservice: ProductService,
		@Inject(MAT_DIALOG_DATA) user
	) { 
		this.userProfile = user.data;
		//   console.log(this.userProfile);
	}

  	ngOnInit() {
		this.profileForm = this.fb.group({
			firstName: [this.userProfile['userInfo'][0]['firstName'], 
					   [Validators.minLength(2),
						Validators.maxLength(20)]],
			lastName: [this.userProfile['userInfo'][0]['lastName'],
					  [Validators.minLength(2),
					   Validators.maxLength(20)]],
			email: [this.userProfile['email']],
			phoneNumber: [this.userProfile['userInfo'][0]['phoneNumber'],
						 [Validators.pattern('[0-9]*'),
						  Validators.minLength(7)]],
			company: [this.userProfile['userInfo'][0]['company'],
					 [Validators.minLength(2),
					  Validators.maxLength(20)]],
			discountLevel: [this.userProfile['userInfo'][0]['discountLevel']]
		})
	}

	get firstName() {
		return this.profileForm.get('firstName');
	}

	get lastName() {
	return this.profileForm.get('lastName');
	}

	get phoneNumber() {
	return this.profileForm.get('phoneNumber');
	}

	get company() {
	return this.profileForm.get('company');
	}

	get discountLevel() {
	return this.profileForm.get('discountLevel');
	}

	getErrorMessageFname() {
		return this.firstName.hasError('required') ? 'Please enter your first name' :
		this.firstName.hasError('minlength' || 'maxlength') ? '8 - 20 characters required' :
		'';
	}

	getErrorMessageLname() {
		return this.lastName.hasError('required') ? 'Please enter your last name' :
	this.lastName.hasError('minlength' || 'maxlength') ? '8 - 20 characters required' :
		'';
	}

	getErrorMessagePhone() {
		return this.phoneNumber.hasError('minlength' || 'maxlength') ? '7 - 20 digits required' :
		'';
	}

	getErrorMessageCom() {
		return this.company.hasError('minlength' || 'maxlength') ? '2 - 20 characters required' :
		'';
	}

	onSubmit() {
		let user = {
			userId: this.profileForm['id'],
			firstName: this.userProfile['userInfo'][0]['firstName'],
			lastName: this.userProfile['userInfo'][0]['lastName'],
			phoneNumber: this.userProfile['userInfo'][0]['phoneNumber'],
			company: this.userProfile['userInfo'][0]['company'],
		}
		console.log('Updated user profile: ', user);
		this.productservice.updateProfile(user,this.profileForm['id']).subscribe(
			success => {
				console.log(success);
			},
			error => {
				console.log('Update Failed Error', error);
				this.errorMessage = "Update failed";
			}
		);
	}
}