import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  allTypes: any = [];
  isBrowser = false;
  galleriesData: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // on mobile screen, click navItems and hide navbar
      $('.navbar-nav>li>a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
      });
    }
    this.getCategories();
    this.getGalleryTypes();
  }
  // get all the categories and show on navbar
  getCategories() {
    this.productService.getProductType().toPromise()
      .then((res) => {
        this.allTypes = Object.values(res).filter((v) => v.prodTypeId !== 2 && v.prodTypeId !== 3);
      })
      .catch(err => console.log(err));
  }
  getGalleryTypes() {
    this.productService.getEventType().subscribe(
      (res) => {
        this.galleriesData = res;
      }, (error) => {
        console.log(error);
      }
    );
  }

  updateCategoryStatus(status: string) {
    this.productService.setSelectedCategory(status);
  }

}
