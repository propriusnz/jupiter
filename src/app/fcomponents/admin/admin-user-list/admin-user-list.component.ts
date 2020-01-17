import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';

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
}
