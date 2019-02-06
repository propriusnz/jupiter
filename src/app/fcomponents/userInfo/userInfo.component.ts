import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.css']
})
export class UserInfoComponent implements OnInit {
  feedback_message:string;
  successMessage:string;
  userInfo={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    company:'',
    streetAddress:'',
    city:'',
    comment:''
  }
  constructor() { }

  ngOnInit() {
  }

  onSubmit({valid}:{valid:boolean}) {
    console.log(valid);
    if(!valid){
      console.log('no');
      this.feedback_message = 'Please check all inputs.'
    }
    else{
      this.feedback_message = '';
      console.log('success');
      console.log(this.userInfo)
      this.successMessage ='Successfully submitted.';
    }
  }

}
