import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataService } from '../../../service/data.service'
import { TermsConditionsComponent } from '../../../fcomponents/basic/user-dialog/terms-conditions/terms-conditions.component'
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loginmessage: string;
  signupmessage: string;

  
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    public dialog: MatDialog,

  ) {
    if (!isPlatformBrowser(this.platformId)) {return;  }
  }

  //   //Customer Signup   
  //   signupDialog() {
  //     this.dialog.open(UserregistrationDialogComponent, {
  //       width: '400px',
  //       height: '680px'
  //     });
  //   }

  //   // Customer Login  
  //   loginDialog() {
  //     this.dialog.open(UserloginDialogComponent, {
  //       width: '400px',
  //       height: '650px',
  //     });
  //   }
  //   newsignupDialog(){
  //     if(this.signupmessage.localeCompare('open')==0){
  //     this.signupDialog()
  //     this.data.changesignupMessage("close") 
  //     }

  //   } 
  //   newloginDialog(){
  //     if(this.loginmessage.localeCompare('open')==0){
  //     this.loginDialog()
  //     this.data.changeloginMessage("close")
  //     }
  //   }

  ngOnInit() {
    // this.data.currentloginmessage.subscribe(
    // 	currentloginmessage=> {this.loginmessage=currentloginmessage;this.newloginDialog()}
    // )
    // this.data.currentsignupmessage.subscribe(currentsignupmessage=>{this.signupmessage=currentsignupmessage;this.newsignupDialog();}
    // )
  }
  openTCdialog() {
    this.dialog.open(TermsConditionsComponent, {
      width: '700px',
      height: '800px'
    });
  }
}
