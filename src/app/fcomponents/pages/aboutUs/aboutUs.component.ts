import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/service/product.service'

@Component({
  selector: 'app-aboutUs',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.getCarts().subscribe(
      (res)=>{
        console.log(res);
      },
      (error)=>{console.log(error)})
      console.log("aboutus");
  }

}
