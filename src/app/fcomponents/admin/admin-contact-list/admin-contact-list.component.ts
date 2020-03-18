import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProfileDialogComponent } from '../admin-dialogs/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-admin-contact-list',
  templateUrl: './admin-contact-list.component.html',
  styleUrls: ['./admin-contact-list.component.css']
})
export class AdminContactListComponent implements OnInit {
	userList: any;
	subscribeState: any;
	ifComments: boolean;
	contactList:any
  constructor(
	private productservice: ProductService,
  ) { }

  ngOnInit() {

	this.getApiData()
  }

  getApiData(){
	this.productservice.getContactEmails().subscribe(
		(res)=>{console.log(res), this.contactList = res},
		(err)=>console.warn(err)
	)
  }

}