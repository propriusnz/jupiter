import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ProductService } from '../../service/product.service';

import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  gallery: any;
  galleryList: any;
  galleryName: any;

  baseImageLink = environment.baseLink;
  constructor(
    private route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title,
    private productService: ProductService,
  ) {
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ]);

    // this.route.params.subscribe(
    //   params => {
    //     this.gallery = this.route.snapshot.params['id'];
    //   }
    // );
    this.titleService.setTitle('Luxe Dream Auckland | ' + this.gallery + ' event hire gallery');
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        // if(this.route.snapshot.params['id']){
        //   this.categoryId = this.route.snapshot.params['id'];
        //   this.changeCate(this.categoryId)
        // }
        // this.typeName = this.route.snapshot.data['some_data'];
        // this.getCategories()
        this.gallery = this.route.snapshot.params['id'];
        this.getGalleryName();
        this.getGalleryType();
      }
    );
  }

  getGalleryType() {
    this.productService.getGalleryByType(this.gallery).subscribe(
      (res) => {
        this.galleryList = res;
      }, (error) => {
        console.log(error);
      }
    );
  }
  getGalleryName() {
    this.productService.getEventTypeById(this.gallery).subscribe(
      (res) => {
        this.galleryName = res['eventName'];
      }, (error) => {
        console.log(error);
      }
    );
  }
}
