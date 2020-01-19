import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { CartdialogComponent } from '../admin-dialogs/cart-dialog/cart-dialog.component';


@Component({
  selector: 'app-admin-cart',
  templateUrl: './admin-cart.component.html',
  styleUrls: ['./admin-cart.component.css']
})
export class AdminCartComponent implements OnInit {
  displayedCartData: any;
  isLoading = false;
  feedbackMessage: string;
  // isDataChanged = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    this.isLoading = true;
    this.productService.getCarts().subscribe(
      (res) => {
        this.displayedCartData = res;
        this.isLoading = false;
    },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.feedbackMessage = 'Server Error!';
      }
    );

  }

  deleteCart(data) {
    const id = data.cartId;
    if (confirm('Are you sure you want to delete this Cart?')) {
      this.productService.deleteCart(id).subscribe(
        (res) => {
          this.getCartData();
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        });
    }
  }

  openCart(data) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '720px';
    dialogConfig.width = '700px';
    dialogConfig.data = {
      id: 1,
      title: 'Cart Detail',
      data: data,
      action: 'update'
    };
    const dialogRef = this.dialog.open(CartdialogComponent, dialogConfig);
    let isDataChanged = false;
    const sub = dialogRef.componentInstance.dataChanges.subscribe(() => {
      isDataChanged = true;
    });
    dialogRef.afterClosed().subscribe(() => {
      if (isDataChanged === true) {
        this.getCartData();
        console.log('data refreshed');
      }
  });
  }
}
