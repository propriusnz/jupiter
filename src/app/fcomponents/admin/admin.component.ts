//import { SESSION_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //blockCodeList:
  //Dashbard:1; Hires:2; Packages:3; Services:4; Gallery:5; Faq:6; Carts:7; 
  blockCode:string = "1"
  displayData:any
  constructor(
    //@Inject(LOCAL_STORAGE)
    //private localStorage: any,
    private router : Router,
    private productService:ProductService
    ){ 
      // !if no JWT, redirect to login page
      if (sessionStorage.getItem('access_token') == '' || sessionStorage.getItem('access_token') == null){
        this.router.navigate(['/login'])
      }
    }

  ngOnInit() {
  } 

  changeBoard(e){
    this.blockCode = e.srcElement.id
    this.getData()
  }

  getData(){
    switch (this.blockCode){
      case "1":{
        break
      }
      case "2":{
        this.getProducts(1)
        break
      }
      case "3":{
        this.getProducts(2)
        break
      }
      case "4":{
        this.getProducts(3)
        break
      }
      case "5":{
        this.productService.indexGallery().subscribe(
          (res)=>{console.log(res),this.displayData = res},
          (error)=>{console.log(error)}
        )
        break;
      }
      case "6":{
        this.productService.getFaq().subscribe(
          (res)=>{console.log(res),this.displayData = res},
          (error)=>{console.log(error)}
        )
        break
      }
      case "7":{
        this.productService.getCarts().subscribe(
          (res)=>{console.log(res),this.displayData = res},
          (error)=>{console.log(error)}
        )
        break
      }
    }
  }

  getProducts(typeCode:number){
    this.productService.indexType(typeCode).subscribe(
      (res) => {
        this.displayData = res['product']
        console.log('this.displayData: ', this.displayData)
      },
      (err) => {console.log(err)}
      )
  }

}
