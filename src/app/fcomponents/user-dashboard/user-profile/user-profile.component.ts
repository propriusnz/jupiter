import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { Profile } from '../../../service/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	updateProfileForm: FormGroup;
	profile: any;
	userId: number;
	subscribe: boolean;

  constructor(
	  private fb: FormBuilder,
	  private service: ProductService
  ) { }

  ngOnInit() {
	  this.userId = JSON.parse(localStorage.getItem("userId"));

	  this.service.getProfile(this.userId).subscribe(
		  profile => {
			console.log(profile);
			  this.profile= profile;
			//   console.log(this.profile['data'][0].email);
	  	  },
	  	  err => {
			console.log(err);
		  }
	  );

	  this.updateProfileForm = this.fb.group({
		  fname: ['', [Validators.minLength(1),
					   Validators.maxLength(20)]],
		  lname: ['', [Validators.minLength(1),
			           Validators.maxLength(20)]],
		  phone: ['', []],
		  company: ['', []],
		  subscribe: ['',]
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

  onSlideChange(subscribe){
    if(subscribe.checked){
      this.subscribe = true;
    }else{
      this.subscribe = false;
    }
    console.log(this.subscribe)
  }
}