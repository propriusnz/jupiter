import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserloginDialogComponent } from '../user-dialog/userlogin-dialog/userlogin-dialog.component';
import { UserregistrationDialogComponent } from '../user-dialog/userregistration-dialog/userregistration-dialog.component'
import { DataService } from '../../../service/data.service'
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  hireCategories: any = [];
  serviceCategories: any = [];
  isBrowser = false;
  galleriesData: any;
  loginmessage: string;
  signupmessage: string;
  userLoginControl: string;
  loggedIn: boolean;
  snackBarmessage = 'Log in successful, welcome!';
  snackBaraction = 'x';

  constructor(
        @Inject(PLATFORM_ID) private platformId,
        private productService: ProductService,
        private data: DataService,
        public dialog: MatDialog,
        private _LoggedIn_snackBar: MatSnackBar
    ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // on mobile screen, click navItems and hide navbar
      $('.navbar-nav>li>a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
      });
    }
    this.getCategories();
    this.getGalleryTypes();
    this.ifLoggedIn();

    if(this.loggedIn == true) {
        this.openSnackBar(this.snackBarmessage, this.snackBaraction);
    }
  }
  // get all the categories and show on navbar
  getCategories(): void {
    this.productService.getProductType().toPromise()
      .then((res) => {
        const returnData = [...Object.values(res)];
        this.hireCategories = returnData.filter((v) => v.typeName === 'Hire')['0']['productCategory']
        this.serviceCategories = returnData.filter((v) => v.typeName === 'Party Services')['0']['productCategory'];
      })
      .catch(err => console.log(err));
  }

  getGalleryTypes() {
    this.productService.getEventType().subscribe(
      (res) => {
        this.galleriesData = res;
      }, (error) => {
        console.log(error);
      }
    );
  }

  updateCategoryStatus(status: string) {
    this.productService.setSelectedCategory(status);
  }

  loginDialog() {
    this.dialog.open(UserloginDialogComponent, {
      width: '400px',
      height: '650px',
    });
  }
  newsignupDialog(){
    if(this.signupmessage.localeCompare('open')==0){
    this.signupDialog()
    this.data.changesignupMessage("close") 
    }
  } 
  newloginDialog(){
    if(this.loginmessage.localeCompare('open')==0){
    this.loginDialog()
    this.data.changeloginMessage("close")
    }
  }
  signupDialog() {
    this.dialog.open(UserregistrationDialogComponent, {
      width: '400px',
      height: '680px'
    });
  }
  logout(){
	localStorage.clear();
    sessionStorage.clear();
    alert('You are now loged out!');
	location.reload();
  }
  ifLoggedIn() {
      if (localStorage.getItem('userToken')) {
          this.loggedIn = true;
          console.log('true');
      } else {
          this.loggedIn = false;
          console.log('false');
      }
  }

  // Log in successful snackbar
  openSnackBar(message: string, action: string) {
    this._LoggedIn_snackBar.open(message, action, {
      duration: 3500,
      verticalPosition: 'top'
    });
  }
}