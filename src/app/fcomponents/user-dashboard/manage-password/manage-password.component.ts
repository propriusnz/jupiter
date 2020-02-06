import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchService } from 'src/app/service/match.service';
import { ProductService } from '../../../service/product.service';

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
	errorMessage = '';
	userId: number;
	userEmail = ''
	constructor(
		private fb: FormBuilder,
		private matchservice: MatchService,
		private productservice: ProductService
	) { }

	ngOnInit() {
		this.userId = JSON.parse(localStorage.getItem('userId'));
		// console.log(this.userId)
		this.productservice.getProfile(this.userId).subscribe(
			profile => {
				this.userEmail = profile['data'][0].email;
			},
			err => {
				console.log(err);
			}
		)
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

	getErrorMessage1() {
		return this.oldpassword.hasError('required') ? 'Please enter your old password' :
			this.oldpassword.hasError('minlength') ? 'Please enter at least 8 characters' :
				this.oldpassword.hasError('maxlength') ? 'Please enter no more than 20 characters' :
					this.oldpassword.hasError('pattern') ? 'Please use combination of letters and characters' : ''
	}

	getErrorMessage2() {  //  New Password
		return this.password.hasError('required') ? 'Please enter your new password' :
			this.password.hasError('minlength') ? 'Please enter at least 8 characters' :
				this.password.hasError('maxlength') ? 'Please enter no more than 20 characters' :
					this.password.hasError('pattern') ? 'Please use combination of letters and characters' : ''
	}

	getErrorMessage3() {   // Confirm New Password
		return this.confirmpassword.hasError('required') ? 'Please confirm your new password' : this.confirmpassword.hasError('notSame') ? 'New password does not match' : ''
	}

	update() {
		this.changeFailed = false;
	}

	get oldpassword() { return this.changePasswdForm.get('oldpassword') };

	get password() { return this.changePasswdForm.get('password') };

	get confirmpassword() { return this.changePasswdForm.get('confirmpassword') };

	onSubmit() {
		const user = {
			email: this.userEmail,
			oldPassword: this.oldpassword.value,
			newPassword: this.password.value
		}
		console.log(user)
		this.productservice.changePassword(user).subscribe(
			success => {
				console.log('Password updated: ', success);
			},
			error => {
				console.log('Change passwd failed', error);
				this.errorMessage = "CHange password failed";
			}
		);
	}
}