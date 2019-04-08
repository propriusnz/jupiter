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
  selectedImg:File = null;
  newProduct:any;
  editImage:boolean = false;
  feedbackMessage:string
  imageList:any
  //TODO: add price, discount price, image
  productForm : {
    title:string,
    subTitle:string,
    totalStock:number,
    description:string,
    prodTypeId:number,
    categoryId:number,
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
      // this.productForm.price = data.data['price']
      // this.productForm.discount = data.data['discount']
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
    },(error) =>{
      console.log(error)
    }
    )
  }
  close(){
    this.dialogRef.close()
  }
  create(){
    // const fd = new FormData();
    // for (let key of Object.keys(this.productForm)){
    //   if  (this.productForm[key] == null){
    //     continue
    //   }
    //   fd.append(key, this.productForm[key])
    // }
    //append product image
    // fd.append('ProductImage',this.selectedImg, this.selectedImg.name)
    this.productService.addProduct(this.productForm).subscribe(
      (res)=>{
        if(res){
          this.newProduct = res
        }
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
    //TODO: upload img
  onFileSelected(e){
    this.selectedImg =<File>e.target.files[0];
  }
  onUpload(){
    // TODO: feedbackMessage not work
    const fd = new FormData();
    fd.append('image',this.selectedImg, this.selectedImg.name)
    fd.append('prodId',JSON.stringify(this.id))
    console.log(fd)
    this.productService.addImg(fd).subscribe((res)=>{
      console.log(res)
      this.feedbackMessage = res['data']
      this.getProductImages()
    },(error)=>{
      this.feedbackMessage = "upload failed"
      console.log(error)
    })
  }
  goEditImage(){
    this.editImage = true
    this.getProductImages()
  }
  goEditProduct(){
    this.editImage = false
  }
  getProductImages(){
    this.productService.getImg(this.id).subscribe(
      (res)=>{
        this.imageList = res
      },(error)=>{
        console.log(error)
      })
  }
}
