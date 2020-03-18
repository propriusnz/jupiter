import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { DataService } from '../../service/data.service';
import { isPlatformBrowser } from '@angular/common';

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
  Coupon=''
  constructor(
    private data:DataService,
    @Inject(PLATFORM_ID) private platformId,
  ) { }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {return;  }

    if ('cartID' in localStorage){
      console.log('still here')
    }
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
  setCoupon(coupon){
    this.Coupon=coupon
  }
 
    
    
    
  

}