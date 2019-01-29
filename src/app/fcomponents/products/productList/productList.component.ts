import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/service/product.service'
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts:any=[]
  typeName:any
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.typeName = this.route.snapshot.data['some_data'];
    console.log(this.typeName)

    if(this.typeName == 'hire'){
      this.productService.indexProduct().subscribe(
      (res)=>{
        this.allProducts=  res['Data']
        console.log(this.allProducts)
      },
      (error)=>{console.log(error)})
    }
    if (this.typeName =='service'){
      this.productService.indexService().subscribe(
      (res)=>{
        this.allProducts=  res['Data']
        console.log(this.allProducts)
      },
      (error)=>{console.log(error)})
    }
    if (this.typeName =="package"){
      this.productService.indexPackage().subscribe(
      (res)=>{
        this.allProducts=  res['Data']
        console.log(this.allProducts)
      },
      (error)=>{console.log(error)})
    }
  }

}
