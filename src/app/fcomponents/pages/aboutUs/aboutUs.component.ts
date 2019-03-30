import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutUs',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private meta: Meta,
    private titleService: Title,
    ) {
      // Following section in constructor for SEO Purposes 
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ])
    this.titleService.setTitle('Luxe Dream Auckland Event and Party Hire | About Us');
  }

  ngOnInit() {
  }

}
