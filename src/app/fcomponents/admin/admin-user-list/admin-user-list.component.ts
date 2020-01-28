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
	allUserInfo = [];
	subscribeState: any;
	
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

			this.userList.forEach(userInfo => {
				// console.log(this.userList[userInfo]);
				if (userInfo[userInfo] != null) {
					userInfo = this.userList[0];
					console.log(userInfo);
				} else {
					userInfo = null;
				}
			});
		  }
	  );
  }

  openEditProfile(user) {
	  const dialogConfig = new MatDialogConfig();
	  dialogConfig.autoFocus = true;
	  dialogConfig.height = '700px';
	  dialogConfig.width = '500px';
	  dialogConfig.data = {
		  data: user
	  }
	  this.dialog.open(ProfileDialogComponent, dialogConfig);
  }
}