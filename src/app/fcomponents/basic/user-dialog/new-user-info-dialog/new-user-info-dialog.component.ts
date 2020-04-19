import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-info-dialog',
  templateUrl: './new-user-info-dialog.component.html',
  styleUrls: []
})

export class NewUserInfoDialogComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    public dialogRef: MatDialogRef<NewUserInfoDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data?,
  ) {

  }
  next(){
      this.redirect()
  }
  ngOnInit() {
  }
  
  redirect() {
    if ( this.data == "New user information") {

    this.router.navigate(['userDashboard']);
      location.reload();
    }
    else{
      this.dialogRef.close();
    }
  }
}