import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  ) {

  }
  next(){
      this.redirect()
  }
  ngOnInit() {
  }
  
  redirect() {
    this.router.navigate(['userDashboard']);
    location.reload();

  }

}