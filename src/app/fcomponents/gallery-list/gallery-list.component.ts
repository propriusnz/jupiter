import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  num:string = "1";

  constructor(
    private meta: Meta,
    private titleService: Title,
  ) {
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ])
    this.titleService.setTitle('Luxe Dream Auckland Party and Event Hire | Event Gallery');
  }

  ngOnInit() {
  }

}
