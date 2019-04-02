import { Component, OnInit ,HostListener } from '@angular/core';

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

  constructor(
    private productService : ProductService) 
    {}
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
