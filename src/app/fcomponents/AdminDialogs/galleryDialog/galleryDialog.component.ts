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
    eventtypeId:0,
    Description:''
  }
  status:string
  displayData:any
  title:string
  events:any;
  isLoading:boolean = false
  constructor(
    private dialogRef: MatDialogRef<GalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService : ProductService
  ) { 
    if(data.action=='update'){
      this.displayData = data.data 
      this.id = data.data['prodjectId']
      this.galleryForm.CustomerName = data.data['customerName']
      this.galleryForm.eventtypeId = data.data['eventtype']['typeId']
      this.galleryForm.Description = data.data['description']
    }
    this.title = data.title
    this.status = data.action
  }

  ngOnInit() {
    console.log(this.galleryForm);
    this.getEventNames()
  }
  getEventNames(){
    this.productService.getEventType().subscribe(
      (res)=>{
      this.events = res
      console.log(this.events)
    },(error)=>{
      console.log(error)
    }
    )
  }
  save(){
    this.isLoading = true
    this.galleryForm.eventtypeId = Number(this.galleryForm.eventtypeId)
    this.productService.updateGallery(this.id,this.galleryForm).subscribe(
      (res)=>{
        this.isLoading = false
        this.dialogRef.close()
    },(error) =>{
      this.isLoading = false
      console.log(error)
    }
    )
  }
  create(){
    this.isLoading = true
    this.productService.addGallery(this.galleryForm).subscribe(
      (res)=>{
        this.isLoading = false
      this.dialogRef.close()
    },(error) =>{
      this.isLoading = false
      console.log(error)
    }
    )
  }
  close(){
    this.dialogRef.close()
  }
}
