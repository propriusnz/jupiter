import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  gallery:any
  galleryList:any


  constructor(
    private route:ActivatedRoute,
    private meta: Meta,
    private titleService: Title,
    private productService: ProductService,
  ) {
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ])
    
    this.route.params.subscribe(
      params => {
        this.gallery = this.route.snapshot.params['id'];
      }
    );
    this.titleService.setTitle('Luxe Dream Auckland | '+ this.gallery +' event hire gallery');
  }

  ngOnInit() {
    this.productService.indexGallery().subscribe(
      (res)=>{
        this.galleryList = res
      },(error)=>{
        console.log(error)
      }
    )
  }

}