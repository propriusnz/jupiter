import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProductService } from '../../../service/product.service'

@Component({
  selector: 'app-galleryDialog',
  templateUrl: './galleryDialog.component.html',
  styleUrls: ['./galleryDialog.component.css']
})
export class GalleryDialogComponent implements OnInit {
  id:number;
  galleryForm = {
    CustomerName:'',
    eventName:'',
    Description:''
  }
  status:string
  displayData:any
  title:string
  constructor(
    private dialogRef: MatDialogRef<GalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    if(data.data){
      this.id = data.data['prodjectId']
      this.galleryForm.CustomerName = data.data['customerName']
      this.galleryForm.eventName = data.data['eventtype']['eventName']
      this.galleryForm.Description = data.data['description']
    }
    this.title = data.title
    this.status = data.action
  }

  ngOnInit() {
    console.log(this.galleryForm);
  }
  getEventNames(){
    this.productService.getEventType().subscribe(
      (res)=>{
      
    },(error)=>{
      console.log(error)
    }
    )
  }
  save(){
    let form = {
      customerName:this.galleryForm.CustomerName,
      Description:this.galleryForm.Description
    }
    this.productService.updateGallery(this.id,form).subscribe(
      (res)=>{
        this.dialogRef.close()
    },(error) =>{
      console.log(error)
    }
    )
  }
}
