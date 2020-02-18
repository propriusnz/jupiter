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
	userId: number;
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
		this.userId = this.userProfile['id'];
		if (this.userProfile['userInfo'][0]) {
			this.profileForm = this.fb.group({
				firstName: [this.userProfile['userInfo'][0]['firstName'], 
							[Validators.minLength(2),
							Validators.maxLength(20)]],
				lastName: [this.userProfile['userInfo'][0]['lastName'],
							[Validators.minLength(2),
							Validators.maxLength(20)]],
				email: [this.userProfile['email'], 
						[Validators.required,
						Validators.email]],
				phoneNumber: [this.userProfile['userInfo'][0]['phoneNumber'],
								[Validators.pattern('[0-9]*'),
								Validators.minLength(7)]],
				company: [this.userProfile['userInfo'][0]['company'],
							[Validators.minLength(2),
							Validators.maxLength(20)]],
				discountLevel: [this.userProfile['userInfo'][0]['discountLevel']],
				comments: [this.userProfile['userInfo'][0]['comments'], 
							[Validators.minLength(2),
							Validators.maxLength(255)]]
			})
		}
	}

	get firstName() {
		return this.profileForm.get('firstName');
	}

	get lastName() {
		return this.profileForm.get('lastName');
	}

	get email() {
		return this.profileForm.get('email');
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
	
	get comments() {
		return this.profileForm.get('comments');
	}

	getErrorMessageFname() {
		return this.firstName.hasError('required') ? 'Please enter your first name' :
		this.firstName.hasError('minlength') ? '8 - 20 characters required' : this.firstName.hasError('maxlength') ? '8 - 20 characters required' :
		'';
	}

	getErrorMessageLname() {
		return this.lastName.hasError('required') ? 'Please enter your last name' :
		this.lastName.hasError('minlength') ? '8 - 20 characters required' : this.lastName.hasError('maxlength') ? '8 - 20 characters required' :
		'';
	}

	getErrorMessagePhone() {
		return this.phoneNumber.hasError('minlength') ? '7 - 20 digits required' : this.phoneNumber.hasError('maxlength') ? '7 - 20 digits required' :
		''; 
	}

	getErrorMessageCom() {
		return this.company.hasError('minlength', 'maxLength') ? '2 - 20 characters required' :  this.company.hasError('maxlength') ? '2 - 20 characters required' :
		'';
	}

	getErrorMessageComments() {
		return this.comments.hasError('minlength') ? 'At least 2 characters required' : this.comments.hasError('maxlength') ? 'Maximum 255 characters' :
		'';
	}

	onSubmit() {
		let user = {
			userId: this.userId,
			firstName: this.profileForm.value.firstName,
			lastName: this.profileForm.value.lastName,
			phoneNumber: this.profileForm.value.phone,
			company: this.profileForm.value.company,
			discountLevel: this.profileForm.value.discountLevel,
			comments: this.profileForm.value.comments
		}
		console.log('Updated user profile: ', user);
		this.productservice.updateProfile(user,this.userId).subscribe(
			success => {
				console.log(success);
				location.reload();
			},
			error => {
				console.log('Update Failed Error', error);
				this.errorMessage = "Update Failed";
			}
		);
	}
}