import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../../../../service/product.service';

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
		console.log(user)
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
				discount: [this.userProfile['discount'], [Validators.min(0), Validators.max(1)]],
				comments: [this.userProfile['userInfo'][0]['comments'],
				[Validators.minLength(2),
				Validators.maxLength(255)]],
				website: [this.userProfile['userInfo'][0]['website']?this.userProfile['userInfo'][0]['website']:null ],
				socialMedia: [this.userProfile['userInfo'][0]['socialMedia']?this.userProfile['userInfo'][0]['socialMedia']:null ],
				nzbn: [this.userProfile['userInfo'][0]['nzbn']?this.userProfile['userInfo'][0]['nzbn']:null],
				businessInfo: [this.userProfile['userInfo'][0]['businessInfo']?this.userProfile['userInfo'][0]['businessInfo']:null],
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

	get discount() {
		return this.profileForm.get('discount');
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
		return this.company.hasError('minlength', 'maxLength') ? '2 - 20 characters required' : this.company.hasError('maxlength') ? '2 - 20 characters required' :
			'';
	}

	getErrorMessageComments() {
		return this.comments.hasError('minlength') ? 'At least 2 characters required' : this.comments.hasError('maxlength') ? 'Maximum 255 characters' :
			'';
	}

	onSubmit() {
		if (!this.profileForm.valid) {
			this.errorMessage = "Theres errors"
			return
				;
		}
		let user = {
			userId: this.userId,
			firstName: this.profileForm.value.firstName,
			lastName: this.profileForm.value.lastName,
			phoneNumber: this.profileForm.value.phone,
			company: this.profileForm.value.company,
			discount: this.profileForm.value.discount,
			comments: this.profileForm.value.comments,

			website: this.profileForm.value.website,
			socialMedia:this.profileForm.value.socialMedia,
			nzbn:this.profileForm.value.nzbn,
			businessInfo:this.profileForm.value.businessInfo,

		}
		console.log('Updated user profile: ', user);
		this.productservice.updateProfile(user, this.userId).subscribe(
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