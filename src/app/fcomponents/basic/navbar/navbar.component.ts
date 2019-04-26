import { Component, OnInit ,HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-navbar', 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  allCategories:any = [];
  isBrowser:boolean = false;
  // galleriesData = ['Weddings','Birthday', 'Girls Night', 'Corporate Event', 'Baby Shower', 'Luxe Dream Floral Studio']
  galleriesData:any;
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService : ProductService) 
    {
      if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true
      }
    }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // on mobile screen, click navItems and hide navbar
      $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });  
    }
    this.getCategories()
    this.getGalleryTypes()
  }
  // get all the categories and show on navbar
  getCategories(){
    this.productService.indexCategory().subscribe((res)=>{
      this.allCategories = res
    },(error)=>{console.log(error)})
  }
  getGalleryTypes(){
    this.productService.getEventType().subscribe(
      (res)=>{
        this.galleriesData = res
        console.log('gallery,',this.galleriesData);
      },(error)=>{
        console.log(error)
      }
    )
  }
}
