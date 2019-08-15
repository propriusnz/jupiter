import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ProductService } from '../../service/product.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  num = '1';
  eventTypeList: any;
  baseImageUrl = environment.baseLink;
  constructor(
    private meta: Meta,
    private titleService: Title,
    private productService: ProductService
  ) {
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ]);
    this.titleService.setTitle('Luxe Dream Auckland Party and Event Hire | Event Gallery');
  }

  ngOnInit() {
    this.productService.getEventType().subscribe(
      (res) => {
        this.eventTypeList = res;
        console.log(res);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
