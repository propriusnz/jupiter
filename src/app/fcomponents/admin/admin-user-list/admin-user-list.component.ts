import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProfileDialogComponent } from '../admin-dialogs/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
	userList: any;
	subscribeState: any;
	ifComments: boolean;
	
  constructor(
	private productservice: ProductService,
	private dialog: MatDialog
  ) { }

  ngOnInit() {
	  this.productservice.getUserList().subscribe(
		  users => {
			// console.log('Users Index:', users);
	
			this.userList = users['data']['result'];
			console.log('All Users: ', this.userList);
			// console.log(this.userList[1].userInfo[0].firstName);

			// this.userList.forEach(userInfo => {
			// 	if (userInfo[userInfo]) {
			// 		this.ifComments = true;
			// 		console.log(userInfo[userInfo]);
			// 	}
			// });
		  },
		  (err)=>{console.warn(err)}
	  );
  }

  openEditProfile(user) {
	  const dialogConfig = new MatDialogConfig();
	  dialogConfig.height = '650px';
	  dialogConfig.width = '900px';
	  dialogConfig.autoFocus = false;
	  dialogConfig.data = {
		  data: user
	  }
	  this.dialog.open(ProfileDialogComponent, dialogConfig);
  }
}