import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  href: string = ""
  isSendingRequest=false
  isSendSuccess=false
  result = true
  expired=false
  payAgainUrl=''
  paymentStatusSuccess = "Your payment is successful!"
  paymentStatusFailure = "Payment Declined!"
  errorMessage="This order is expired."
  cartId: any
  user=true
  constructor(
    private router: Router,
    private productService: ProductService

  ) {
  }

  ngOnInit() {
    this.isSendingRequest=true
    if('userId' in localStorage){
      this.user=true
    }else{
      this.user=false
    }
    this.cartId = JSON.parse(localStorage.getItem('cartId'))
    console.log(this.cartId)
    this.productService.getCartStatus(this.cartId).subscribe(
      res=>{
        console.log(res)
        if(res['isPay']==0 && res['isExpired']==1){
          this.expired=true
        }else if(res['isPay']==0 && res['isExpired']==0){
          this.productService.requestPaymentUrl(this.cartId).subscribe(
            res=>{
              console.log(res)
              this.payAgainUrl=res['url']
            },
            err=>{
              console.log(err)
            }
          )
        }
        
      },
      err=>{
        console.log(err)
      }
    )
    this.href = this.router.url
    console.log(this.href)
    let url = {
      url: this.href
    }
    this.productService.paymentResult(url).subscribe(
      (res) => {
        this.isSendingRequest=false
        this.isSendSuccess=true
        console.log(res)
        if (res['responseText'].localeCompare('APPROVED') == 0) {
          this.result = true
        } else if (res['responseText'].localeCompare('DECLINED') == 0) {
          this.result = false
          console.log("this is false")
        }
      }
      ,
      (error) => {
        this.isSendingRequest=false
        this.isSendSuccess=true
        console.log(error);

      }
    )

  }
  payAgain(){
    window.location.assign(this.payAgainUrl)
  }
}


