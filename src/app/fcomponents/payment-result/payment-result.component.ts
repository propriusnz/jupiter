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
  result = true
  paymentStatusSuccess = "Your payment is successful!"
  paymentStatusFailure = "Payment Declined!"
  cartId: any
  constructor(
    private router: Router,
    private productService: ProductService

  ) {
    this.cartId = JSON.parse(localStorage.getItem('cartId'))
    console.log(this.cartId)
  }

  ngOnInit() {
    this.href = this.router.url
    console.log(this.href)
    let url = {
      url: this.href
    }
    this.productService.paymentResult(url).subscribe(
      (res) => {
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
        console.log(error);

      }
    )

  }
}


