import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-admin-sideBar',
  templateUrl: './admin-sideBar.component.html',
  styleUrls: ['./admin-sideBar.component.css']
})
export class AdminSideBarComponent implements OnInit {
  displayedProductTypes: any;
  navBarIconArray: Array<object> = [
    {'Id': 1, 'Icon': 'fas fa-shopping-bag'},
    {'Id': 2, 'Icon': 'fas fa-gift'},
    {'Id': 3, 'Icon': 'fas fa-briefcase'},
    {'Id': 4, 'Icon': 'fab fa-pagelines'},
    {'Id': 5, 'Icon': 'fas fa-mask'},
    {'Id': 6, 'Icon': 'fas fa-umbrella-beach'},
  ]
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductTypes();
  }
  getProductTypes() {
    this.productService.getProductType().toPromise()
      .then(data => {
        this.displayedProductTypes = Object.values(data);
      })
      .catch(err => console.log(err));
  }
}
