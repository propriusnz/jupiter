import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId:number
  productDetail:any;
  quantity:number=1 ;
  quantityLength:number;
  quantityFilled:boolean = true;
  defaultImgUrl:string = '../../../../assets/images/product1.jpg';
  // 1: add to cart; 2: successfully added 3:failed
  inCart:number = 1;
  cartList = [];
  @ViewChild('small') small: ElementRef;
  @ViewChild('shadow') shadow: ElementRef;
  @ViewChild('showDetails') showDetails: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('detailImg') detailImg: ElementRef;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService, 
    private _location:Location   
  ) { 
    this.productId = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    console.log(this.productId)
    this.productService.showProduct(this.productId).subscribe( 
      (res)=>{
        this.productDetail = res
        this.quantityLength = this.productDetail.totalStock.toString().length;
        console.log(this.productDetail)
      },
      (error)=>console.log(error)
    )
    this.setStorage()
    }
  quanCheck(e){
    if(e){
      this.quantityFilled = true
      if(e>this.productDetail.TotalStock){
        this.quantity = this.productDetail.TotalStock
      }
      if(e.toString().slice(0,1)=='-' || e.toString().slice(0,1)=='+'){
        this.quantity = 1
      }
    }
    if(!e){
      this.quantityFilled = false
    }
  }
  changeImg(e){
    this.defaultImgUrl = e.srcElement.attributes[2].nodeValue
  }
  setStorage(){
    if ('cartList' in localStorage){
      this.cartList = JSON.parse(localStorage.getItem('cartList'))
    }else{
      localStorage.setItem('cartList',JSON.stringify(this.cartList))
    }
    localStorage.setItem('userId','aaa ')
  }
  addToCart(){
    // cartId?
    let item = {
      ProdId:Number(this.productId),
      Price:this.quantity*this.productDetail.price,
      Title:this.productDetail.title,
      Quantity:this.quantity
    }    
    // let a:boolean = false
    this.cartList = JSON.parse(localStorage.getItem('cartList'))
      this.cartList.push(item)
      localStorage.setItem('cartList',JSON.stringify(this.cartList))

    // if (this.cartList.length>0){
    //   for (let i=0; i<this.cartList.length;i++){
    //     if(this.cartList[i].Title == this.productDetail.Title){
    //       a = true
    //       this.cartList[i].Quantity += this.quantity
    //       localStorage.setItem('cartList',JSON.stringify(this.cartList))
    //       console.log(this.cartList)
    //     }
    //   }
    //   if (a==false){
    //     this.cartList.push(item)
    //     localStorage.setItem('cartList',JSON.stringify(this.cartList))  
    //   }
    // }else{
    //   this.cartList = JSON.parse(localStorage.getItem('cartList'))
    //   this.cartList.push(item)
    //   localStorage.setItem('cartList',JSON.stringify(this.cartList))
    // }


  }
  mouseEnter(){
    this.shadow.nativeElement.style.display = "block";
    this.showDetails.nativeElement.style.display = "block";	
  }
  mouseLeave(){
    this.shadow.nativeElement.style.display = "none";
    this.showDetails.nativeElement.style.display = "none";	
  }
  mouseMove(e){
      const box = this.container.nativeElement;	
			const smallBox = this.small.nativeElement;
			const mask = this.shadow.nativeElement;
			const bigImg = this.detailImg.nativeElement;
 
			let x = e.pageX - box.offsetLeft;
			let y = e.pageY - box.offsetTop;	
			x = x - mask.offsetWidth/2;
			y = y - mask.offsetHeight/2;
 
			if (x < 0) {
				x = 0
			}
			if (x > smallBox.offsetWidth - mask.offsetWidth) {
				x = smallBox.offsetWidth - mask.offsetWidth;
			}
			
			if (y < 0) {
				y = 0
			}
			if (y > smallBox.offsetHeight - mask.offsetHeight) {
				y = smallBox.offsetHeight - mask.offsetHeight
			}
 
			mask.style.left = x + "px";
			mask.style.top = y + "px";
 
			bigImg.style.left = -bigImg.offsetWidth/smallBox.offsetWidth * x + "px"; 
			bigImg.style.top = -bigImg.offsetHeight/smallBox.offsetHeight * y + "px";
  }
  backClicked(){
    this._location.back();
  }
}
