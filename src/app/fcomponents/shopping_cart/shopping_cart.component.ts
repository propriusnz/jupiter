import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-shopping_cart',
  templateUrl: './shopping_cart.component.html',
  styleUrls: ['./shopping_cart.component.css']
})
export class Shopping_cartComponent implements OnInit {
  totalPrice = 0;
  prodsInCart: any;
  productDetail: any;
  @ViewChild('quantityInput') quantityInput: ElementRef;
  constructor(
    private productService: ProductService
    ){}

  ngOnInit() {
    // get the current shopping cart
    this.prodsInCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    // get the image of product
    this.prodsInCart.forEach(element => {
      this.productService.getImg(element.ProdId).subscribe((res => {
        element.url = res[0]['url'];
      }));
    });
    this.getAllStock();
    this.price();
  }
  // delete items of shopping cart
  deleteCart(id) {
    this.prodsInCart.splice(id, 1);
      localStorage.setItem('cartList', JSON.stringify(this.prodsInCart));
    this.price()
  }
  // calculate total price of shopping cart
  price(){
    this.totalPrice = 0;
    this.prodsInCart.forEach(prod => {
      this.totalPrice += prod.Price;
    });
      localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
  }
  getAllStock() {
    this.prodsInCart.forEach(element => {
      this.productService.showProduct(element.ProdId).subscribe((res => {
        element.availableStock = res['availableStock'];
      }));
    });
  }

  quantityChanged(e, i) {
    let newQuantity = e.srcElement.valueAsNumber;
    let unitPrice = this.prodsInCart[i].Price / this.prodsInCart[i].Quantity;
    let totalPriceOfProduct = unitPrice * newQuantity;
    this.prodsInCart[i].Quantity = newQuantity;
    this.prodsInCart[i].Price = totalPriceOfProduct;
    // if (this.prodsInCart[i].availableStock >= newQuantity){
      // update localStorage
      // localStorage.setItem("cartList",JSON.stringify(this.prodsInCart));
      this.price();
    // }
  }
  quantityMinus(i) {
    // this.prodsInCart[i].Quantity -= 1;
    this.quantityInput.nativeElement.stepDown();
  }
  quantityPlus(i) {
    // this.prodsInCart[i].Quantity += 1;
    this.quantityInput.nativeElement.stepUp();
  }

}
