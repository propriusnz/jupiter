import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { userInfo } from 'os';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
	profileForm: {
		id: number,
		email: string,
		firstName: string,
		lastName: string,
		phoneNumber: string,
		company: string,
		discountLevel: string
	} = {
		id : 0,
		email: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		company: '',
		discountLevel: ''
	}

  constructor(
	private dialogRef: MatDialogRef<ProfileDialogComponent>,
	@Inject(MAT_DIALOG_DATA) user,
  ) { 
	  this.profileForm.id = user.id;
	  this.profileForm.email = user.email;
	  this.profileForm.firstName = user.firstName;
	//   this.profileForm.lastName = user.user.userInfo[0].lastNmae;
	//   this.profileForm.phoneNumber = user.user.userInfo[0].phoneNumber;
	//   this.profileForm.discountLevel = user.user.discountLevel;
  }

  ngOnInit() {
	  
  }

}
