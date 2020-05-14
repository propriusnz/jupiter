import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { Profile } from '../../../service/data.service';
import { NewUserInfoDialogComponent } from '../../basic/user-dialog/new-user-info-dialog/new-user-info-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	eventBusiness = false
	updateProfileForm: FormGroup;
	profile: any;
	userId: number;
	subscribe: number;
	firstname: string;
	lastname: string;
	email: string;
	phoneno: string;
	com: string;
	subs: number;
	comments: string;
	errorMessage = '';
	discount: any;
	successMessage: any;
	companyData={}

	constructor(
		private fb: FormBuilder,
		private productservice: ProductService,
		public dialog: MatDialog,
	) { }

	ngOnInit() {
		this.userId = JSON.parse(localStorage.getItem('userId'));
		//   console.log(this.userId);

		this.productservice.getProfile(this.userId).subscribe(
			profile => {
				console.log('Current logged in user：', profile);
				this.profile = profile;
				this.firstname = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].firstName : null;
				this.lastname = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].lastName : null;
				this.email = profile['data'][0].email;
				this.phoneno = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].phoneNumber : null;
				this.com = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].company : null;
				this.comments = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].comments : null;
				this.companyData = profile['data'][0].userInfo[0]
				// this.comments = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].comments : null;
				// this.comments = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].comments : null;
				// this.comments = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].comments : null;
				// this.comments = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].comments : null;

				if (profile['data'][0].discount != 1) {
					this.discount = profile['data'][0].discount;
				}
				if (profile['data'][0].isSubscribe == 1) {
					this.subs = 1;
				} else {
					this.subs = 0;
				}
				this.form();
			},
			err => {
				console.log(err);
			}
		);
	}

	form() {
		this.updateProfileForm = this.fb.group({
			fname: [this.firstname, [Validators.minLength(2),
			Validators.maxLength(20)]],
			lname: [this.lastname, [Validators.minLength(2),
			Validators.maxLength(20)]],
			phone: [this.phoneno, [Validators.pattern('[0-9]*'),
			Validators.minLength(7),
			Validators.maxLength(20)]],
			company: [this.com, [Validators.minLength(2),
			Validators.maxLength(20)]],
			website: [this.companyData['website']?this.companyData['website']:null ],
			socialMedia: [this.companyData['socialMedia']?this.companyData['socialMedia']:null ],
			nzbn: [this.companyData['nzbn']?this.companyData['nzbn']:null],
			businessInfo: [this.companyData['businessInfo']?this.companyData['businessInfo']:null],
			subscribe: [this.subs]
		});
	}

	get fname() {
		return this.updateProfileForm.get('fname');
	}

	get lname() {
		return this.updateProfileForm.get('lname');
	}

	get phone() {
		return this.updateProfileForm.get('phone');
	}

	get company() {
		return this.updateProfileForm.get('company');
	}

	getErrorMessage1() {
		return this.fname.hasError('required') ? 'Please enter your first name' :
			this.fname.hasError('minlength' || 'maxlength') ? '8 - 20 characters required' :
				'';
	}

	getErrorMessage2() {
		return this.lname.hasError('required') ? 'Please enter your last name' :
			this.lname.hasError('minlength' || 'maxlength') ? '8 - 20 characters required' :
				'';
	}

	getErrorMessage3() {
		return this.phone.hasError('minlength' || 'maxlength') ? '7 - 20 digits required' :
			'';
	}

	getErrorMessage4() {
		return this.company.hasError('minlength' || 'maxlength') ? '2 - 20 characters required' :
			'';
	}

	onSlideChange(subscribe) {
		if (subscribe.checked) {
			this.subscribe = 1;
		} else {
			this.subscribe = 0;
		}
	}
	plannerChange(value){
		this.eventBusiness = value
	}

	onSubmit() {
		this.errorMessage = null;
		let user = {
			userId: this.userId,
			firstName: this.updateProfileForm.value.fname,
			lastName: this.updateProfileForm.value.lname,
			phoneNumber: this.updateProfileForm.value.phone,
			company: this.updateProfileForm.value.company,
			isSubscribe: this.subscribe,
			website: this.updateProfileForm.value.website,
			socialMedia:this.updateProfileForm.value.socialMedia,
			nzbn:this.updateProfileForm.value.nzbn,
			businessInfo:this.updateProfileForm.value.businessInfo,
		}
		console.log('Updated user profile: ', user);
		this.productservice.updateProfile(user, this.userId).subscribe(
			success => {
				this.successMessage = "Profile updated !"
				console.log(success);
			},
			error => {
				console.log('Update Failed Error', error);
				this.errorMessage = "Update failed";
			}
		);
	}
	openEventPlanningDialog() {
		this.dialog.open(NewUserInfoDialogComponent, {
			width: '550px',
			height: '680px',
			data: 'For event planners'
		});
	}
}