import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  href:string=""
  result=false
  paymentStatusSuccess="Your payment is successful!"
  paymentStatusFailure="Payment Declined!"
  constructor(
    private router:Router,
    private productService: ProductService
    ) { }
    
  ngOnInit() {
    this.href=this.router.url
    console.log(this.href)
    let url={
      url:this.href
    }
    this.productService.paymentResult(url).subscribe(
      (res)=>{
        console.log(res)
      },
      (error) => {
        console.log(error);
        
      }
    )

    }
  }


