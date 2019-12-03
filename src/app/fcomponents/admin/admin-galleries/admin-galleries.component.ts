import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GallerydialogComponent } from '../admin-dialogs/gallery-dialog/gallery-dialog.component';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-admin-galleries',
  templateUrl: './admin-galleries.component.html',
  styleUrls: ['./admin-galleries.component.css']
})
export class AdminGalleriesComponent implements OnInit {
  displayedGalleryData: any;
  displayedEventTypeData: any;
  isLoading = false;
  baseImageLink = environment.baseLink;
  feedbackMessage: string;
  selectedImg: File = null;
  isEventTypeImageEmpty: boolean;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): Promise<any> {
    this.isLoading = true;
    const promise1 = this.productService.indexGallery().toPromise()
      .then(res => this.displayedGalleryData = res);
    const promise2 = this.productService.getEventType().toPromise()
      .then(res => this.displayedEventTypeData = res);

    return Promise.all([promise1, promise2])
      .then(() => this.isLoading = false)
      .catch(err => {
        this.isLoading = false;
        this.feedbackMessage = 'Server Error!';
      });
  }

  // getGalleryData() {
  //   this.isLoading = true;
  //   this.productService.indexGallery().subscribe(
  //     (res) => {
  //       this.displayedGalleryData = res;
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       console.log(error);
  //     }
  //   );
  // }
  // getEventTypeData() {
  //   this.isLoading = true;
  //   this.productService.getEventType().subscribe(
  //     (res) => {
  //       this.displayedEventTypeData = res;
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       console.log(error);
  //     }
  //   );
  // }
  openGallery(data) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '750px';
    dialogConfig.width = '750px';

    dialogConfig.data = {
      id: 1,
      title: 'Update Gallery',
      data: data,
      action: 'update'
    };
    const dialogRef = this.dialog.open(GallerydialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  createGallery() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '750px';
    dialogConfig.width = '750px';

    dialogConfig.data = {
      id: 1,
      title: 'Create Gallery',
      action: 'create'
    };
    const dialogRef = this.dialog.open(GallerydialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  deleteGallery(data) {
    const id = data.prodjectId;
    if (confirm('Are you sure you want to delete this Gallery?')) {
      alert('Deleting gallery, please wait...');
      this.productService.deleteGallery(id).subscribe(
        (res) => {
          this.getData();
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        });
    }
  }

  onEventTypeImageSelected(e) {
    this.selectedImg = <File>e.target.files[0];
    if (this.selectedImg == null) {
      this.isEventTypeImageEmpty = true;
    } else {
      this.isEventTypeImageEmpty = false;
    }
  }

  onUploadEventTypeImage(eventDetail) {
    if (this.selectedImg == null) {
      this.isEventTypeImageEmpty = true;
    } else {
      this.isEventTypeImageEmpty = false;
      this.isLoading = true;
      const fd = new FormData();
      fd.append('FormFile', this.selectedImg, this.selectedImg.name);
      fd.append('Id', JSON.stringify(eventDetail.typeId));
      this.productService.updateEventTypeImage(fd).subscribe((res) => {
        this.isLoading = false;
        this.feedbackMessage = res['data'];
        this.getData();
        // this.eventImageInput.nativeElement.value = null;
      }, (error) => {
        this.isLoading = false;
        this.feedbackMessage = 'upload failed';
        console.log(error);
      });
    }
  }

}
