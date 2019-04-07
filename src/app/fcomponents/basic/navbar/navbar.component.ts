import { Component, OnInit ,HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { ProductService } from '../../../service/product.service';
declare var $: any;

@Component({
  selector: 'app-navbar', 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  allCategories:any = [];
  smallwindow:boolean = true;
  isBrowser:boolean = false;
  galleriesData = ['Weddings','Birthday', 'Girls Night', 'Corporate Event', 'Baby Shower', 'Luxe Dream Floral Studio']

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService : ProductService) 
    {
      if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true
      }
    }
  ngOnInit() {
    $('.navbar-nav>li>a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
  });

    this.getCategories()
  }

  getCategories(){
    this.productService.indexCategory().subscribe((res)=>{
      this.allCategories = res
    },(error)=>{console.log(error)})
  }
  


  

}
