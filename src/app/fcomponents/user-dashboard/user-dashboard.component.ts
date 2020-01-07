import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from 'src/app/fcomponents/user-dashboard/user-profile/user-profile.component';
import { OrderHistoryComponent } from 'src/app/fcomponents/user-dashboard/order-history/order-history.component';
import { ManagePasswordComponent } from 'src/app/fcomponents/user-dashboard/manage-password/manage-password.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
	
  constructor(
	
  ) { }

  ngOnInit() {
	 
  }
}