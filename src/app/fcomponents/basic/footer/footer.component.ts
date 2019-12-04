import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserloginDialogComponent } from '../user-dialog/userlogin-dialog/userlogin-dialog.component';
import { UserregistrationDialogComponent } from '../user-dialog/userregistration-dialog/userregistration-dialog.component'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  //Customer Signup   
  signupDialog() {
    this.dialog.open(UserregistrationDialogComponent, {
      width: '400px',
      height: '650px'
    });
  }
  
  // Customer Login  
  loginDialog() {
    this.dialog.open(UserloginDialogComponent, {
      width: '400px',
      height: '650px',
    });
  }

  ngOnInit() {
  }

}
