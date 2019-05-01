import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import{ ProductService } from '../../../service/product.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contactUs',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css']
})
export class ContactUsComponent implements OnInit {
  minDate: any;
  feedback_message: string;
  successMessage: string;
  emailSent = false;
  isSendingEmail = false;
  contactFrom = {
    name: '',
    email: '',
    PhoneNumber: '',
    company: '',
    dateOfEvent: '',
    LocationOfEvent: '',
    findUs: '',
    TypeOfEvent: '',
    message: ''
  };
  constructor(
    private productService: ProductService,
    private meta: Meta,
    private titleService: Title,
    ) {
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ]);
    this.titleService.setTitle('Luxe Dream Auckland Event Hire | Contact us');
  }

  ngOnInit() {
    this.minDate = moment().format();
  }
  onSubmit({valid}: {valid: boolean}) {
    if (!valid) {
      this.feedback_message = 'Please fill all required inputs.';
    } else {
      this.feedback_message = '';
      this.sendEmail();
    }
  }

  // Passes data to service
  sendEmail() {
    this.isSendingEmail = true;
    this.productService.sendContactEmail(this.contactFrom).subscribe(
      (res) => {
        this.isSendingEmail = false;
        // this.feedback_message="Thank you for contacting us, we'll be in touch very shortly.",
        this.emailSent = true;
        },
      (error) => {
        console.log(error);
        this.feedback_message ='Oops, something went wrong.';
        this.isSendingEmail = false;
    }
    );
  }
}
