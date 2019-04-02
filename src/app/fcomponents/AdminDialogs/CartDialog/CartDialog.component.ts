import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductService } from '../../../service/product.service'

@Component({
  selector: 'app-CartDialog',
  templateUrl: './CartDialog.component.html',
  styleUrls: ['./CartDialog.component.css']
})
export class CartDialogComponent implements OnInit {
  id:number;
  // cartForm = {
  //   Question:'',
  //   Answer:''
  // }
  status:string
  displayData:any
  title:string

  constructor(
    private dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    if(data.data){
      this.id = data.data['id']
      this.displayData = data.data
    }
    this.title = data.title
    this.status = data.action
  }

  ngOnInit() {
    console.log(this.displayData);
  }
  // save(){
  //   this.productService.updateCart(this.id, this.cartForm).subscribe(
  //     (res)=>{
  //     this.dialogRef.close()
  //   },(error) =>{
  //     console.log(error)
  //   }
  //   )
  // }
  close() {
    this.dialogRef.close();
  }
}
