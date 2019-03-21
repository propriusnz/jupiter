import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping_cart',
  templateUrl: './shopping_cart.component.html',
  styleUrls: ['./shopping_cart.component.css']
})
export class Shopping_cartComponent implements OnInit {
  prodsInCart:any;
  constructor() { }

  ngOnInit() {
    this.prodsInCart = JSON.parse(localStorage.getItem("cartList") || "[]");
  }

}
