import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductService } from '../../../service/product.service'

@Component({
  selector: 'app-productDialog',
  templateUrl: './productDialog.component.html',
  styleUrls: ['./productDialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  id:number;
  productForm = {
    title:'',
    subTitle:'',
    totalStock:0,
    description:''
  }
  status:string
  displayData:any
  title:string
  type:string
  constructor(
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    //TODO: use map
    this.productForm.title = data.data['title']
    this.productForm.subTitle = data.data['subTitle']
    this.productForm.totalStock = data.data['totalStock']
    this.productForm.description = data.data['description']


    this.type = data.blockCode
    this.id = data.data['prodId']
    this.title = data.title
    this.status = data.action

    switch (this.type) {
      case "2":{
        //Hire
        break;
      }
      case "3":{
        //Services
        break;
      }
      case "4":{
        //Packages
        break;
      }
     
    }
  }

  ngOnInit() {
  }
  save(){
    //this.galleryForm.eventtypeId = Number(this.galleryForm.eventtypeId)
    this.productService.updateProduct(this.id,this.productForm).subscribe(
      (res)=>{
        console.log(res)
        this.dialogRef.close()
    },(error) =>{
      console.log(error)
    }
    )
  }
  close(){
    this.dialogRef.close()
  }

}
