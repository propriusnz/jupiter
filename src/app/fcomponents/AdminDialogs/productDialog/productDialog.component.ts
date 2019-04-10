import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
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
  isLoading:boolean = false
  isImageEmpty:boolean = false
  @ViewChild('imageInput') imageInput : ElementRef
  productForm : {
    title:string,
    subTitle:string,
    totalStock:number,
    description:string,
    prodTypeId:number,
    categoryId:number,
    price:number,
    discount:number
  } = {
    title:'',
    subTitle:'',
    totalStock:0,
    description:'',
    prodTypeId:0,
    categoryId:null,
    price:null,
    discount:null
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
      this.productForm.price = data.data['price']
      this.productForm.discount = data.data['discount']
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
    // const fd = new FormData();
    // for (let key of Object.keys(this.productForm)){
    //   if  (this.productForm[key] == null){
    //     continue
    //   }
    //   fd.append(key, this.productForm[key])
    // }
    //append product image
    // fd.append('ProductImage',this.selectedImg, this.selectedImg.name)
    this.isLoading = true
    this.productService.addProduct(this.productForm).subscribe(
      (res)=>{
        this.isLoading = false
        this.newProduct = res
      this.dialogRef.close()
    },(error) =>{
      this.isLoading = false
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
  onFileSelected(e){
    this.selectedImg =<File>e.target.files[0];
    if (this.selectedImg == null){
      this.isImageEmpty = true
    }else{
      this.isImageEmpty = false
    }
  }
  // !upload image
  onUpload(){
    if (this.selectedImg == null){
      this.isImageEmpty = true
    }else{
      this.isImageEmpty = false
      this.isLoading = true
      const fd = new FormData();
      fd.append('image',this.selectedImg, this.selectedImg.name)
      fd.append('prodId',JSON.stringify(this.id))
      console.log(fd)
      this.productService.addImg(fd).subscribe((res)=>{
        this.isLoading = false
        console.log(res)
        this.feedbackMessage = res['data']
        this.getProductImages()
        this.imageInput.nativeElement.value = null;
      },(error)=>{
        this.isLoading = false
        this.feedbackMessage = "upload failed"
        console.log(error)
      })
    }
  }
  // ! delete image
  deleteImage(id:number){
    this.isLoading = true
    this.productService.deleteImg(id).subscribe(
      (res)=>{
        this.isLoading = false
        this.feedbackMessage = "Delete Successfully"
        this.getProductImages()
      },(error)=>{
        this.isLoading = false
        this.feedbackMessage = "Delete Failed"
      })
  }
  goEditImage(){
    this.editImage = true
    this.getProductImages()
  }
  goEditProduct(){
    this.editImage = false
  }
  //!refresh image data
  getProductImages(){
    this.productService.getImg(this.id).subscribe(
      (res)=>{
        this.imageList = res
      },(error)=>{
        console.log(error)
      })
  }
}
