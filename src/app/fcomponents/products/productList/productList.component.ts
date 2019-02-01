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
  // title Price CategroyName ProdTypeName Description
  hireData:any[] = [
    {Title:'Classic Letter Range',Price:150.00,CategroyName:'chairStyle1',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Classic Number',Price:160.00,CategroyName:'chairStyle2',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Deluxe Letter Range',Price:170.00,CategroyName:'chairStyle3',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Deluxe Number Range',Price:180.00,CategroyName:'chairStyle4',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'}
  ];
  serviceData:any[]=[
    {Title:'Signature Letter Range',Price:250.00,CategroyName:'serviceStyle1',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Illuminated LOVE',Price:210.00,CategroyName:'serviceStyle2',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'LOVE in White',Price:230.00,CategroyName:'serviceStyle3',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Mr & Mrs',Price:220.00,CategroyName:'serviceStyle4',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'}
  ];
  packageData:any[]=[
    {Title:'Illuminated Heart',Price:330.00,CategroyName:'packageStyle1',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Giant WoodenLOVE',Price:300.00,CategroyName:'packageStyle2',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Hot Dog/Food Station',Price:350.00,CategroyName:'packageStyle3',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'White Branding',Price:320.00,CategroyName:'packageStyle4',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
    {Title:'Food Station',Price:290.00,CategroyName:'packageStyle5',ProdTypeName:'prodTypeName',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'}
 ];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.typeName = this.route.snapshot.data['some_data'];
    console.log(this.typeName)
    if(this.typeName == 'hire'){
      this.allProducts = this.hireData
      // this.productService.indexProduct().subscribe(
      // (res)=>{
      //   this.allProducts=  res['Data']
      //   console.log(this.allProducts)
      // },
      // (error)=>{console.log(error)})
    }
    if (this.typeName =='service'){
      this.allProducts = this.serviceData
      // this.productService.indexService().subscribe(
      // (res)=>{
      //   this.allProducts=  res['Data']
      //   console.log(this.allProducts)
      // },
      // (error)=>{console.log(error)})
    }
    if (this.typeName =="package"){
      this.allProducts = this.packageData
      // this.productService.indexPackage().subscribe(
      // (res)=>{
      //   this.allProducts=  res['Data']
      //   console.log(this.allProducts)
      // },
      // (error)=>{console.log(error)})
    }
  }

}
