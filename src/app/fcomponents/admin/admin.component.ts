import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogConfig} from "@angular/material";
import { AdminDialogComponent } from '../adminDialog/adminDialog.component';
import { FaqDialogComponent } from '../AdminDialogs/FaqDialog/FaqDialog.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //blockCodeList:
  //Dashbard:1; Hires:2; Packages:3; Services:4; Gallery:5; Faq:6; Carts:7; 
  blockCode:string = "1"
  displayData:any
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router : Router,
    private productService:ProductService,
    private dialog: MatDialog
    ){ 
      if (isPlatformBrowser(this.platformId)){
      // !if no JWT, redirect to login page
      if (sessionStorage.getItem('access_token') == '' || sessionStorage.getItem('access_token') == null){
        this.router.navigate(['/login'])
      }}
    }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  } 

  changeBoard(e){
    this.blockCode = e.srcElement.id
    this.getData()
  }

  getData(){
    switch (this.blockCode){
      case "1":{
        break
      }
      case "2":{
        this.getProducts(1)
        break
      }
      case "3":{
        this.getProducts(2)
        break
      }
      case "4":{
        this.getProducts(3)
        break
      }
      case "5":{
        this.productService.indexGallery().subscribe(
          (res)=>{this.displayData = res},
          (error)=>{console.log(error)}
        )
        break;
      }
      case "6":{
        this.productService.getFaq().subscribe(
          (res)=>{this.displayData = res},
          (error)=>{console.log(error)}
        )
        break
      }
      case "7":{
        this.productService.getCarts().subscribe(
          (res)=>{this.displayData = res},
          (error)=>{console.log(error)}
        )
        break
      }
    }
  }

  getProducts(typeCode:number){
    this.productService.indexType(typeCode).subscribe(
      (res) => {
        this.displayData = res['product']
      },
      (err) => {console.log(err)}
      )
  }
  //update Faq
  openDialog(dataRecord){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Update FAQ',
      data: dataRecord,
      action:'update'
    }
    let dialogRef = this.dialog.open(FaqDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  // create new Faq
  createFaq(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Create FAQ',
      action:'create'
    }
    let dialogRef = this.dialog.open(FaqDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  // delete Faq
  deleteFaq(data){
    let id = data.id
    this.productService.deleteFaq(id).subscribe(
      (res)=>{
        this.getData()
        alert('Success')
      },(error)=>{
        console.log(error)
        alert('failed')
      })
  }
}
