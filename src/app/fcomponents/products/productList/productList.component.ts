import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/service/product.service'
@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts:any=[]
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.indexProduct().subscribe(
    (res)=>{
      this.allProducts=  res['Data']
      console.log(this.allProducts)
    },
    (error)=>{console.log(error)})
  }

}
