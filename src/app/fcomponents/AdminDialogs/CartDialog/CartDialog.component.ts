import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductService } from '../../../service/product.service'

@Component({
  selector: 'app-CartDialog',
  templateUrl: './CartDialog.component.html',
  styleUrls: ['./CartDialog.component.css']
})
export class CartDialogComponent implements OnInit {
  cartId:number;  
  contactId:number;
  status:string
  displayData:any
  title:string
  cartProdList:any
  isCardProdDeleted:boolean = false
  contactForm = {
    email:'',
    firstName:'',
    lastName:'',
    message:'',
    phoneNum:''
  }
  cartForm = {
    location:'',
    plannedTime:'',
    price:0,
  }
  constructor(
    private dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    //!contact
    this.contactForm.email = data.data['contact']['email']
    this.contactForm.firstName = data.data['contact']['firstName']
    this.contactForm.lastName = data.data['contact']['lastName']
    this.contactForm.phoneNum = data.data['contact']['phoneNum']
    this.contactForm.message = data.data['contact']['message']

    //!cartProd
    //!cart
    this.cartId = data.data['id']
    this.displayData = data.data
    console.log(data)
    this.title = data.title
    this.status = data.action
  }

  ngOnInit() {
    console.log(this.displayData['cartProd']);
    this.getCartProds()
  }
  close() {
    this.dialogRef.close();
  }
  updateContact(){
    this.productService.updateContacts(this.displayData['contactId'], this.contactForm).subscribe(
      (res)=>{
        console.log(res)
      },(error)=>{
        console.log(error)
      })
  }
  updateCart(){

  }
  updateCardProd(id ){

  }
  getCartProds(){
    this.productService.getCardProd(this.cartId).subscribe(
      (res)=>{
        this.cartProdList = res
      },(error)=>{
        console.log(error)
      }
    )
  }
  deleteCardProd(id){
    this.productService.deleteCartProd(id).subscribe(
      (res)=>{
        console.log(res)
        this.getCartProds()
    }, (error)=>{
      console.log(error)
    })
  }


}
