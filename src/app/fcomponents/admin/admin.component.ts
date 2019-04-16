import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { FaqDialogComponent } from '../AdminDialogs/FaqDialog/FaqDialog.component';
import { GalleryDialogComponent } from '../AdminDialogs/galleryDialog/galleryDialog.component';
import { ProductDialogComponent } from '../AdminDialogs/productDialog/productDialog.component'
import { CartDialogComponent } from '../AdminDialogs/CartDialog/CartDialog.component'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // blockCodeList:
  // Dashbard:1; Hires:2; Packages:3; Services:4; Gallery:5; Faq:6; Carts:7; 
  blockCode: string = '1'
  isDataChanged : boolean = false
  displayData: any
  selectedImg: File = null
  isLoading: boolean = false
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog
    ) {
      if (isPlatformBrowser(this.platformId)) {
      // !if no JWT, redirect to login page
      if (sessionStorage.getItem('access_token') === '' || sessionStorage.getItem('access_token') == null) {
        this.router.navigate(['/login']);
      }}
    }

  ngOnInit() {
  }
  changeBoard(e) {
    this.blockCode = e.srcElement.id;
    this.getData();
  }

  getData(){
    this.isLoading = true
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
      case '5' : {
        this.productService.indexGallery().subscribe(
          (res) => { 
            this.displayData = res
            this.isLoading = false},
          (error) => { 
            console.log(error)
            this.isLoading = false}
        );
        break;
      }
      case '6' : {
        this.productService.getFaq().subscribe(
          (res) => {
            this.displayData = res
            this.isLoading = false}
          ,(error) => {
            console.log(error)
            this.isLoading = false
          }
        );
        break;
      }
      case '7' : {
        this.productService.getCarts().subscribe(
          (res) => { 
            this.displayData = res
            this.isLoading = false
          console.log(res) },
          (error) => { 
            console.log(error)
            this.isLoading = false
          }
        );
        break;
      }
    }
  }

  getProducts(typeCode: number) {
    this.productService.indexType(typeCode).subscribe(
      (res) => {
        this.isLoading = false
        this.displayData = res;
      },
      (err) => { 
        this.isLoading = false
        console.log(err)
       }
      );
  }
  // update Faq
  openFaq(dataRecord) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px'
    dialogConfig.width = '750px'
    dialogConfig.data = {
      id: 1,
      title: 'Update FAQ',
      data: dataRecord,
      action: 'update'
    }
    let dialogRef = this.dialog.open(FaqDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  // create new Faq
  createFaq() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px'
    dialogConfig.width = '750px'

    dialogConfig.data = {
      id: 1,
      title: 'Create FAQ',
      action: 'create'
    };
    let dialogRef = this.dialog.open(FaqDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  // delete Faq
  deleteFaq(data){
    let id = data.id
    if (confirm('Are you sure you want to delete this Faq?')) {
      this.productService.deleteFaq(id).subscribe(
        (res)=>{
          this.getData()
          alert('Success')
        },(error)=>{
          console.log(error)
          alert('Failed')
        })
    } else {
        // Do nothing!
    }
  }
  deleteCart(data){
    let id = data.cartId
    if (confirm('Are you sure you want to delete this Cart?')) {
      this.productService.deleteCart(id).subscribe(
        (res)=>{
          this.getData()
          alert('Success')
        },(error)=>{
          console.log(error)
          alert('Failed')
        })
    } else {
        // Do nothing!
    }
  }
  openGallery(data){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '550px'
    dialogConfig.width = '750px'

    dialogConfig.data = {
      id: 1,
      title: 'Update Gallery',
      data: data,
      action:'update'
    }
    let dialogRef = this.dialog.open(GalleryDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  createGallery(){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px'
    dialogConfig.width = '750px'


    dialogConfig.data = {
      id: 1,
      title: 'Create Gallery',
      action:'create'
    }
    let dialogRef = this.dialog.open(GalleryDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  deleteGallery(data){
    let id = data.prodjectId
    if (confirm('Are you sure you want to delete this Gallery?')) {
      this.productService.deleteGallery(id).subscribe(
        (res)=>{
          this.getData()
          alert('Success')
        },(error)=>{
          console.log(error)
          alert('Failed')
        })
    } else {
        // Do nothing!
    }
  }
  openProduct(data){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '650px'
    dialogConfig.width = '750px'
    dialogConfig.data = {
      id: 1,
      title: 'Update Product',
      data: data,
      action:'update',
      blockCode: this.blockCode
    }
    let dialogRef = this.dialog.open(ProductDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }

  createProduct(){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px'
    dialogConfig.width = '750px'


    dialogConfig.data = {
      id: 1,
      title: 'Create Product',
      action:'create',
      blockCode: this.blockCode
    }
    let dialogRef = this.dialog.open(ProductDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  deleteProduct(data){

    let id = data.prodId
    if (confirm('Are you sure you want to delete this Product?')) {
      this.productService.deleteProduct(id).subscribe(
        (res)=>{
          this.getData()
          alert('Success')
        },(error)=>{
          console.log(error)
          alert('Failed')
        }
      )
    } else {
        // Do nothing!
    }
  }
  openCart(data){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '650px'
    dialogConfig.width = '750px'
    dialogConfig.data = {
      id: 1,
      title: 'Cart Detail',
      data: data,
      action: 'update'
    }
    let dialogRef = this.dialog.open(CartDialogComponent, dialogConfig);
    this.isDataChanged = false
    const sub = dialogRef.componentInstance.dataChanges.subscribe(() => {
      this.isDataChanged = true
    });
    dialogRef.afterClosed().subscribe(() => {
      if(this.isDataChanged == true){
        this.getData();
        console.log('data refreshed');
      }else{
        console.log('data not changed');
      }
  });
  }
  
}
