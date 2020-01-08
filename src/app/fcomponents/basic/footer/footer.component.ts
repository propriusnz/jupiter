import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserloginDialogComponent } from '../user-dialog/userlogin-dialog/userlogin-dialog.component';
import { UserregistrationDialogComponent } from '../user-dialog/userregistration-dialog/userregistration-dialog.component'
import { DataService } from '../../../service/data.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loginmessage:string;
  signupmessage:string;
  constructor(
      private data:DataService, 
      public dialog: MatDialog
  ) { }

  //Customer Signup   
  signupDialog() {
    this.dialog.open(UserregistrationDialogComponent, {
      width: '400px',
      height: '680px'
    });
  }
  
  // Customer Login  
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
  ngOnInit() {
    this.data.currentloginmessage.subscribe(currentloginmessage=> 
      {this.loginmessage=currentloginmessage;this.newloginDialog()}
    
      )
    this.data.currentsignupmessage.subscribe(currentsignupmessage=>{this.signupmessage=currentsignupmessage;this.newsignupDialog();}
    )
  }

}
