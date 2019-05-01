import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqdata: any;

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
      this.faqdata = res;
    },
    (error) => console.log(error));
  }

}
