import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogConfig} from '@angular/material';
// import { FaqDialogComponent } from '../AdminDialogs/FaqDialog/FaqDialog.component';
// import { GalleryDialogComponent } from '../AdminDialogs/galleryDialog/galleryDialog.component';
// import { ProductDialogComponent } from '../AdminDialogs/productDialog/productDialog.component';
// import { CartDialogComponent } from '../AdminDialogs/CartDialog/CartDialog.component';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // blockCodeList:
  // Dashbard:1; Hires:2; Packages:3; Services:4; Gallery:5; Faq:6; Carts:7;
  blockCode = '1';
  isDataChanged = false;
  displayData: any;
  selectedImg: File = null;
  isLoading = false;

  feedbackMessage = '';
  allEventTypes: any;
  isEventTypeImageEmpty: boolean;
  baseImageLink = environment.baseLink;

  @ViewChild('eventImageInput') eventImageInput: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
    ) {
      // if (isPlatformBrowser(this.platformId)) {
      // // !if no JWT, redirect to login page
      // if (sessionStorage.getItem('access_token') === '' || sessionStorage.getItem('access_token') == null) {
      //   this.router.navigate(['/login']);
      // }}
    }

  ngOnInit() {
    // this.getData();
  }
  changeBoard(e) {
    this.blockCode = e.srcElement.id;
    // this.getData();
  }

  // getData() {
  //   this.isLoading = true;
  //   switch (this.blockCode) {
  //     // show dashboard, edit category panel
  //     case '1': {
  //       this.isLoading = false;
  //       break;
  //     }
  //   }
  // }
}
