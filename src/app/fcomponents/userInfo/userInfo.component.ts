import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service'

@Component({
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.css']
})
export class UserInfoComponent implements OnInit {
  feedback_message:string;
  successMessage:string;
  userInfo={
    FirstName:'',
    LastName:'',
    Email:'',
    PhoneNum:'',
    company:'',
    streetAddress:'',
    city:'',
    Message:''
  }

  constructor(private productService:ProductService) { }

  ngOnInit() {
  }

  onSubmit({valid}:{valid:boolean}) {
    console.log(valid);
    if(!valid){
      console.log('no')
      this.feedback_message = 'Please check all inputs.'
    }
    else{
      let { FirstName, LastName, PhoneNum, Email, Message} = this.userInfo
      let post = {
        FirstName: FirstName,
        LastName: LastName,
        PhoneNum: PhoneNum,
        Email: Email,
        Message: Message
      }
      this.submitCart(post)
      this.cleanStorage()
    }
  }

  submitCart(post){
    //let data = JSON.parse(localStorage.getItem("cartList"))
    let data = JSON.parse(localStorage.getItem("cartList") || "[]");

    let cartdata = {
      location: `${this.userInfo.streetAddress}, ${this.userInfo.city}`,
      price:Number(localStorage.getItem('totalPrice')),
      CartProd: data
    };
    let cartContact = {
      CartModel: cartdata,
      ContactModel: post
    };
    this.productService.addCart(cartContact).subscribe(
      (res)=>{
        console.log(res)
      },
      (error)=>{
        console.log(error)
        this.feedback_message = 'Error'
      });
  }

  cleanStorage(){
    localStorage.clear()
  }

}
