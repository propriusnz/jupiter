import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
  isDetailFormChanged:boolean = false
  
  detailList=[]
  detailForm: FormGroup;
  detailItems: FormArray;

  @ViewChild('imageInput') imageInput : ElementRef
  productForm : {
    title:string,
    subTitle:string,
    totalStock:number,
    availableStock:number,
    description:string,
    prodTypeId:number,
    categoryId:number,
    price:number,
    discount:number
  } = {
    title:'',
    subTitle:'',
    totalStock:0,
    availableStock:0,
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
    private productService : ProductService,
    //initial formBuilder
    private formBuilder: FormBuilder
  ) { 
    if (data.action == 'update'){
      this.displayData = data.data 
      this.id = data.data['prodId']
      this.productForm.title = data.data['title']
      this.productForm.subTitle = data.data['subTitle']
      this.productForm.totalStock = data.data['totalStock']
      this.productForm.availableStock = data.data['availableStock']
      this.productForm.description = data.data['description']
      this.productForm.categoryId = data.data['categoryId']
      this.productForm.price = data.data['price']
      this.productForm.discount = data.data['discount']
      if (data.data['productDetail']){
        this.detailList = data.data['productDetail']
      }
    }
    this.productForm.prodTypeId = Number(data.blockCode)-1
    this.dialogTitle = data.title
    this.status = data.action
  }

  ngOnInit() {
    this.getCategories()
    this.detailForm = this.formBuilder.group({
      detailItems: this.formBuilder.array([])
    })
    this.getDetails() 

    //Detect array changes
    this.detailForm.controls.detailItems.valueChanges.subscribe(
      changes=>{
        this.isDetailFormChanged = true
      }
    )
  }
  // save changes to product and close this dialog
  save(){
    this.productService.updateProduct(this.id,this.productForm).subscribe(
      (res)=>{
        this.dialogRef.close()
    },(error) =>{
      console.log(error)
    })
    if (this.isDetailFormChanged == true){
      this.updateDetails()
    }
  }
  // close this dialog
  close(){
    this.dialogRef.close()
  }
  // create a new product
  create(){
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
  // get the categories of product
  getCategories(){
    this.productService.indexCategory().subscribe(
      (res)=>{
        this.allCategories = res
      },
      (error)=>{
        console.log(error)
      })
  }
  // select file need to be uploaded
  onFileSelected(e){
    this.selectedImg =<File>e.target.files[0];
    if (this.selectedImg == null){
      this.isImageEmpty = true
    }else{
      this.isImageEmpty = false
    }
  }
  // upload images
  onUpload(){
    if (this.selectedImg == null){
      this.isImageEmpty = true
    }else{
      this.isImageEmpty = false
      this.isLoading = true
      const fd = new FormData();
      fd.append('image',this.selectedImg, this.selectedImg.name)
      fd.append('prodId',JSON.stringify(this.id))
      this.productService.addImg(fd).subscribe((res)=>{
        this.isLoading = false
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
  // delete images of product
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
  // go to the panel of editing images of product
  goEditImage(){
    this.editImage = true
    this.getProductImages()
  }
  // go to the panel of editing details of product
  goEditProduct(){
    this.editImage = false
  }
  // get images of product
  getProductImages(){
    this.productService.getImg(this.id).subscribe(
      (res)=>{
        this.imageList = res
      },(error)=>{
        console.log(error)
      })
  }
  // get existed product specifications 
  getDetails(){
    this.detailList.forEach(prod => {
      let control = <FormArray>this.detailForm.controls.detailItems
      control.push(
        this.formBuilder.group({
          Id:prod.id,
          ProdId:this.id,
          ProductDetail1:prod.productDetail1,
          TotalStock: prod.totalStock,
          AvailableStock: prod.availableStock,
          Price: prod.price,
          Discount: prod.discount,
        })
      )
    });
  }
  // add a new specification to product
  addDetails(){
    let control = <FormArray>this.detailForm.controls.detailItems
    control.push(
      this.formBuilder.group({
        Id:0,
        ProdId:this.id,
        ProductDetail1:null,
        TotalStock: null,
        AvailableStock: null,
        Price: null,
        Discount: null,
      })
    )
  }
  // delete a specification of product
  deleteDetail(detail,i){
    let control = <FormArray>this.detailForm.controls.detailItems
    control.removeAt(i)
    this.productService.deleteProductDetail(detail.value.Id).subscribe(
      (res)=>{
      },(error)=>{
        console.log(error)
      }
    )
  }
  // update the specifications of product
  updateDetails(){
    let detailList = this.detailForm.controls.detailItems['value']
    
    this.productService.updateProductDetails(this.id, detailList).subscribe((res)=>{
    },(error)=>{
      console.log(error)
    })
  }
}
