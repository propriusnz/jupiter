import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqdata:any;
  questions: any[] = [
    {
      question: 'What happens in a free Gradspace consultation?',
      answer: 'In a consultation, you will get an idea of what it takes to get into your dream job. \
      Get a personalised and detailed understanding of the services we can provide to you. \
      Discuss your strength and weaknesses in your pathway to career success.'
    },
    {
      question: 'How long is the Gradspace Software Developer Program?',
      answer: 'That depends on the graduate and their time commitment. It may last anywhere between 1 month to 1 year.'
    },
    {
      question: 'When do programs start?',
      answer: 'Most Gradspace programs start on the Monday of every month.'
    },
    {
      question: 'Are graduates enrolled in the Gradspace programs guaranteed to find a job?',
      answer: 'You are guaranteed to find a job in your discipline/field, provided reasonably continuous commitment.'
    }
  ];

  constructor(
    private productService:ProductService,
    private meta: Meta,
    private titleService: Title,
    ) {
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ])
    this.titleService.setTitle('Luxe Dream Auckland Event and Party Hire | FAQ');
  }

  ngOnInit() {
    this.productService.getFaq().subscribe((res)=>
    {
      console.log(res)
      this.faqdata = res;
    },
    (error)=>console.log(error));
  }

}
