import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProductService} from '../../../service/product.service'
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId:number
  productDetail:any;
  constructor(
    private route:ActivatedRoute,
    private productService:ProductService
  ) { 
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    console.log(this.productId)
    this.productService.showProduct(this.productId).subscribe( 
      (res)=>{
        this.productDetail = res['Data']
        console.log(this.productDetail)
      },
      (error)=>console.log(error)
    )
  }

}
