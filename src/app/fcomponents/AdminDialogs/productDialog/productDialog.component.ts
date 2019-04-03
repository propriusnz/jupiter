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
  productForm : {
    title:string,
    subTitle:string,
    totalStock:number,
    description:string,
    prodTypeId:number,
    categoryId:number
  } = {
    title:'',
    subTitle:'',
    totalStock:0,
    description:'',
    prodTypeId:0,
    categoryId:null
  }
  status:string
  displayData:any
  dialogTitle:string
  allCategories:any;
  constructor(
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    //TODO: use map
    if (data.action == 'update'){
      this.displayData = data.data 
      this.id = data.data['prodId']
      this.productForm.title = data.data['title']
      this.productForm.subTitle = data.data['subTitle']
      this.productForm.totalStock = data.data['totalStock']
      this.productForm.description = data.data['description']
      this.productForm.categoryId = data.data['categoryId']
    }
    this.productForm.prodTypeId = Number(data.blockCode)-1
    this.dialogTitle = data.title
    this.status = data.action
  }

  ngOnInit() {
    this.getCategories()
  }
  save(){
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
  create(){
    this.productService.addProduct(this.productForm).subscribe(
      (res)=>{
      console.log(this.productForm);
      this.dialogRef.close()
    },(error) =>{
      console.log(error)
    }
    )
  }
  getCategories(){
    this.productService.indexCategory().subscribe(
      (res)=>{
        console.log(res)
        this.allCategories = res
      },
      (error)=>{
        console.log(error)
      })
  }
}
