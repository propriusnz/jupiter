import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  isSendingRequest = false
  isSendSuccess = null
  result = true
  expired = false
  payAgainUrl = ''
  paymentStatusSuccess = "Your payment is successful!"
  paymentStatusFailure = "Payment Declined!"
  errorMessage = "This order is expired."
  cartId: any
  user = true
  isAskingStatus = false
  resultUrl = ''
  userIdUrl = ''
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.resultUrl = params['result'];
      this.userIdUrl = params['userid']
    });


  }

  ngOnInit() {
    if(!isPlatformBrowser(this.platformId)){
      return ;
    }

    this.isSendingRequest = true
    if ('userId' in localStorage) {
      this.user = true
    } else {
      this.user = false
    }
    let url = {
      result: this.resultUrl,
      userid: this.userIdUrl
    }
    this.productService.paymentResult(url).subscribe(
      (res) => {
        console.log(res)
        this.isSendingRequest = false
        this.isSendSuccess = true
        if (res['responseText'].localeCompare('APPROVED') == 0) {
          this.clearLocalStorage()
          this.result = true
        } else if (res['responseText'].localeCompare('DECLINED') == 0) {
          this.result = false
        }
      }
      ,
      (error) => {
        console.warn(error)
        this.isSendingRequest = false
        this.isSendSuccess = false
      }
    )

  }
  clearLocalStorage() {
    localStorage.removeItem('productTimetable')
    localStorage.removeItem('cartList')
    localStorage.removeItem('totalPrice')
  }

  // payAgain(){
  //   this.isAskingStatus=true
  //   this.productService.getCartStatus(this.cartId).subscribe(
  //     res=>{
  //       console.log(res)
  //       this.isAskingStatus=false
  //       if(res['isPay']==0 && res['isExpired']==1){
  //         this.expired=true
  //       }else if(res['isPay']==0 && res['isExpired']==0){
  //         this.productService.requestPaymentUrl(this.cartId).subscribe(
  //           res=>{
  //             console.log(res)
  //             this.payAgainUrl=res['url']
  //             window.location.assign(this.payAgainUrl)
  //           },
  //           err=>{
  //             this.isAskingStatus=false
  //             console.log(err)
  //           }
  //         )
  //       }

  //     },
  //     err=>{
  //       this.isAskingStatus=false
  //       console.log(err)
  //     }
  //   )
  // }
}


