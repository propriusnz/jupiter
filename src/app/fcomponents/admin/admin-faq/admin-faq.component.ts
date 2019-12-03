import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FaqdialogComponent } from '../admin-dialogs/faq-dialog/faq-dialog.component';


@Component({
  selector: 'app-admin-faq',
  templateUrl: './admin-faq.component.html',
  styleUrls: ['./admin-faq.component.css']
})
export class AdminfaqComponent implements OnInit {
  displayedFaqData: any;
  isLoading = false;
  feedbackMessage:any;
  
  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getFaqData();
  }

  getFaqData() {
    this.productService.getFaq().subscribe(
      (res) => {
        this.displayedFaqData = res;
        this.isLoading = false;
      }
      , (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  openFaq(dataRecord) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '750px';
    dialogConfig.data = {
      id: 1,
      title: 'Update FAQ',
      data: dataRecord,
      action: 'update'
    };
    const dialogRef = this.dialog.open(FaqdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getFaqData();
    });
  }

  createFaq() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '750px';

    dialogConfig.data = {
      id: 1,
      title: 'Create FAQ',
      action: 'create'
    };
    const dialogRef = this.dialog.open(FaqdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getFaqData();
    });
  }

  deleteFaq(data) {
    const id = data.id;
    if (confirm('Are you sure you want to delete this Faq?')) {
      this.productService.deleteFaq(id).subscribe(
        (res) => {
          this.getFaqData();
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        });
    }
  }

}
