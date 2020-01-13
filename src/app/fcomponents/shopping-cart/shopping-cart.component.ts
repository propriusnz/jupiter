import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalPrice = 0;
  prodsInCart: any;
  productDetail: any;
  stockUnavailable = false;
  userInputQuantityArray = [];
  baseImageLink = environment.baseLink;
  @ViewChild('quantityInput', { static: false }) quantityInput: ElementRef;
  constructor(
    private productService: ProductService
    ){}

  ngOnInit() {
    // get the current shopping cart
    this.prodsInCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    if (this.prodsInCart == null || this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    }
    // get the image of product
    this.prodsInCart.forEach(element => {
      this.productService.getImg(element.ProdId).subscribe((res => {
        element.url = res[0]['url'];
      }));
      this.userInputQuantityArray.push(element.Quantity);
    });
    this.getAllStock();
    this.price();
  }
  // delete items of shopping cart
  deleteCart(id) {
    this.prodsInCart.splice(id, 1);
    localStorage.setItem('cartList', JSON.stringify(this.prodsInCart));
    if (this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    }
    this.price();
  }
  // calculate total price of shopping cart
  price() {
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
    let errorAmount = 0;
    this.userInputQuantityArray[i] = e.srcElement.valueAsNumber;
    let unitPrice = this.prodsInCart[i].Price / this.prodsInCart[i].Quantity;
    let totalPriceOfProduct = unitPrice * this.userInputQuantityArray[i];
    // update localStorage when shoppingCart is valid
    if (this.prodsInCart[i].availableStock >= this.userInputQuantityArray[i]) {
      this.prodsInCart[i].Quantity = this.userInputQuantityArray[i];
      this.prodsInCart[i].Price = totalPriceOfProduct;
      this.price();
      localStorage.setItem('cartList', JSON.stringify(this.prodsInCart));
    }
    // get the amount of invalid input
    for (let a = 0; a < this.userInputQuantityArray.length; a++) {
      if (this.userInputQuantityArray[a] > this.prodsInCart[a].availableStock) {
        errorAmount += 0;
      } else {
        errorAmount += 1;
      }
    }
    if (errorAmount === this.prodsInCart.length) {
      // all inputs are valid, user can submit shopping cart
      this.productService.setShoppingCartStatus(true);
    } else {
      // one or more inputs is/are invalid, disable the submit button
      this.productService.setShoppingCartStatus(false);
    }
  }
}