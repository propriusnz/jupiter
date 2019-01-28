import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-contactUs',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css']
})
export class ContactUsComponent implements OnInit {
  minDate:any;
  feedback_message:string;
  successMessage:string;
  contactFrom={
    name:'',
    email:'',
    phone:'',
    company:'',
    dateOfEvent:'',
    locationOfEvent:'',
    findUs:'',
    eventType:'',
    message:''
  }
  constructor() { }

  ngOnInit() {
    this.minDate = moment().format()  
  }
  onSubmit({valid}:{valid:boolean}) {
    console.log(valid);
    if(!valid){
      console.log('no');
      this.feedback_message = 'Please fill all inputs.'
    }
    else{
      this.feedback_message = '';
      console.log('success');
      console.log(this.contactFrom)
      this.successMessage ='Successfully submitted.';
    }
  }
  formCheck(){
    console.log(this.contactFrom)
  }
}
