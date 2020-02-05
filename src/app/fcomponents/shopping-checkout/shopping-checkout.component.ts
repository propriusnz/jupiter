import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-checkout',
  templateUrl: './shopping-checkout.component.html',
  styleUrls: ['./shopping-checkout.component.css']
})
export class ShoppingCheckoutComponent implements OnInit {
  isPickup=''
  district=''
  constructor() { }

  ngOnInit() {
  }
  pickupOrdelievery(option){
    this.isPickup=option
  }
  districtOption(option){
    this.district=option
  }

}