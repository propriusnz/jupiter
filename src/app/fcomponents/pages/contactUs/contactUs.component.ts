import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import{ ProductService } from '../../../service/product.service';

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
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.minDate = moment().format();
  }
  onSubmit({valid}:{valid:boolean}) {
    console.log(valid);
    if(!valid){
      console.log('no');
      this.feedback_message = 'Please fill all inputs.'
    }
    else{
      this.feedback_message = '';

      console.log(this.contactFrom)
      this.contactApiCall();
    }
  }

  // Passes data to service
  contactApiCall(){
    this.productService.addContacts(this.contactFrom).subscribe(
      (res)=>{console.log(res), this.feedback_message="Thank you for contacting us, we'll be in touch very shortly."},
      (err)=>{console.warn(err), this.feedback_message="Opps, something went wrong."}
    )
  }
}
