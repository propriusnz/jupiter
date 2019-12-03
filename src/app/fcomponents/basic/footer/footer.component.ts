import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserloginDialogComponent } from '../user-dialog/userlogin-dialog/userlogin-dialog.component';
import {UserregistrationDialogComponent} from '../user-dialog/userregistration-dialog/userregistration-dialog.component'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(public dialog:MatDialog) { }
  openDialog(){
    let dialogRef=this.dialog.open(UserregistrationDialogComponent, {
      width:'500px',
      height:'500px'
    });
  }

  // Customer Login  
  loginDialog() {
	
	let dialogRef = this.dialog.open(UserloginDialogComponent, {
		minWidth: '350px',
		minHeight: '500px',
	});
}

  ngOnInit() {
  }

}
