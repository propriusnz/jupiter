import { Component, OnInit,ViewChild,ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProductService} from '../../../service/product.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
//import {Location} from '@angular/common';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId:number
  productDetail:any;
  prodMediaUrl:any;
  quantity:number=1 ;
  quantityFilled:boolean = true;
  isprodAdded:boolean = false;
  inCart:number = 1;
  cartList = [];

  cartForm: FormGroup;
  cartItems: FormArray;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private productService:ProductService, 
    private formBuilder: FormBuilder
  ) { 
    this.productId = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    this.cartForm = this.formBuilder.group({
      cartItems: this.formBuilder.array([])
    });    
    this.productService.showProduct(this.productId).subscribe( 
      (res)=>{
        this.productDetail = res
        this.createItem(res)
        this.prodMediaUrl =  this.productDetail.productMedia;
        console.log('prod detail',this.productDetail)
      },
      (error)=>console.log(error)
    )
    this.setStorage()
    }

  createItem(res){
    res['productDetail'].forEach(prod => {
      let control = <FormArray>this.cartForm.controls.cartItems
      control.push(
        this.formBuilder.group({
          ProdId:prod.prodId,
          Title:prod.productDetail1,
          Quantity:0,
          Price:(prod.discount && prod.discount>0) ? prod.price - prod.discount: prod.price,
          Discount:prod.discount,
          AvailableStock: prod.availableStock
        })
      )
    });

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

  setStorage(){
      if ('cartList' in localStorage){
        this.cartList = JSON.parse(localStorage.getItem('cartList'))
      }else{
        localStorage.setItem('cartList',JSON.stringify(this.cartList))
      }
      localStorage.setItem('userId','aaa ')
  }

  manageCartProds(){
    let newCartList = []
   
      // if product detail exist
    if(this.productDetail['productDetail'] && this.productDetail['productDetail'].length!=0){
      this.cartForm.controls.cartItems['value'].forEach(cartItem => {
        // cartItem.Title = this.productDetail.title + ': ' + cartItem.Title
        let item = {
          ProdId:cartItem.ProdId,
          Price: cartItem.Price*cartItem.Quantity,
          Title: this.productDetail.title + ': ' + cartItem.Title, 
          Quantity:cartItem.Quantity
        }
       newCartList.push(item)
      })
      this.addToCart(newCartList)
    }else{
      // if no product detail
      var productPrice = (this.productDetail.discount && this.productDetail.discount>0) ? this.productDetail.price - this.productDetail.discount : this.productDetail.price
      let item = {
        ProdId:Number(this.productId),
        Price:this.quantity*productPrice,
        Title:this.productDetail.title,
        Quantity:this.quantity
      }
      newCartList.push(item)
      this.addToCart(newCartList)
    }

  }

  addToCart(list){
    this.isprodAdded = true
    setTimeout( ()=>{
      this.isprodAdded = false
      }, 1000)

      list.forEach(item => {
        let a:boolean = false

        if (this.cartList.length>0){
          for (let i=0; i<this.cartList.length;i++){
            if(this.cartList[i].Title == item.Title){
              a = true
              this.cartList[i].Quantity += item.Quantity
              this.cartList[i].Price = this.cartList[i].Quantity*item.Price
              localStorage.setItem('cartList',JSON.stringify(this.cartList))
              console.log('cartList',this.cartList)
            }
          }
          if (a==false){
            this.cartList.push(item)
            localStorage.setItem('cartList',JSON.stringify(this.cartList))  
          }
        }else{
          this.cartList = JSON.parse(localStorage.getItem('cartList'))
          this.cartList.push(item)
          localStorage.setItem('cartList',JSON.stringify(this.cartList))
        }
      });
  }
  backClicked(type:string, id?:number){
    if (id){
      this.router.navigate(['/category/',id]);
    }
    if (type == 'services'){
      this.router.navigate(['/services'])
    }
    if(type == 'packages'){
      this.router.navigate(['/packages']);
    }
  }
  showForm(){
    console.log('Forms: ',this.cartForm.controls.cartItems['value']);
  }
}
