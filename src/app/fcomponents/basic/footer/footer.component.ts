import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignupDialogComponent } from '../../AdminDialogs/signup-dialog/signup-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(public dialog:MatDialog) { }
  openDialog(){
    this.dialog.open(SignupDialogComponent);
  }

  // Customer Login  
  loginDialog() {
	
	let dialogRef = this.dialog.open(DialogComponent, {
		minWidth: '350px',
		minHeight: '500px',
	});
}

  ngOnInit() {
  }

}
