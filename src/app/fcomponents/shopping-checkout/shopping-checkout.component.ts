import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

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
  message:string
  constructor(
    private data:DataService
  ) { }

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