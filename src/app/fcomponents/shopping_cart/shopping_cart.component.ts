import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-shopping_cart',
  templateUrl: './shopping_cart.component.html',
  styleUrls: ['./shopping_cart.component.css']
})
export class Shopping_cartComponent implements OnInit {
  totalPrice:number = 0;
  prodsInCart:any;
  prodImage:any;
  imageList = []
  constructor(
    private productService : ProductService
    ){}

  ngOnInit() {
    this.prodsInCart = JSON.parse(localStorage.getItem("cartList") || "[]");
    this.prodsInCart.forEach(element => {
      this.productService.getImg(element.ProdId).subscribe((res=>{
        element.url = res[0]['url']
      }))
    });
    console.log(this.prodsInCart)
    this.price()
  }
  deleteCart(id){
    console.log(id);
    this.prodsInCart.splice(id,1)
      localStorage.setItem("cartList",JSON.stringify(this.prodsInCart))
    this.price()
  }
  price(){
    this.totalPrice = 0
    this.prodsInCart.forEach(prod => {
      this.totalPrice += prod.Price
    });
      localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
    }
}
