import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-checkout',
  templateUrl: './shopping-checkout.component.html',
  styleUrls: ['./shopping-checkout.component.css']
})
export class ShoppingCheckoutComponent implements OnInit {
  isPickup=''
  district=''
  EventStartDate=''
  EventEndDate=''
  constructor() { }

  ngOnInit() {
  }
  pickupOrdelievery(option){
    this.isPickup=option
  }
  districtOption(option){
    this.district=option
  }
  StartDate(date){
    this.EventStartDate=date
  }
  EndDate(date){
    this.EventEndDate=date
  }

}