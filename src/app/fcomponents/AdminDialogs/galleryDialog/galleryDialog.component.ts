import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-galleryDialog',
  templateUrl: './galleryDialog.component.html',
  styleUrls: ['./galleryDialog.component.css']
})
export class GalleryDialogComponent implements OnInit {
  id: number;
  imageList: any;
  selectedImg: File = null;
  isImageEmpty = false;
  @ViewChild('imageInput') imageInput: ElementRef;
  galleryForm = {
    CustomerName: '',
    eventtypeId: 0,
    Description: ''
  };
  status: string;
  displayData: any;
  title: string;
  events: any;
  editImage = false;
  isLoading = false;
  feedbackMessage: string;
  constructor(
    private dialogRef: MatDialogRef<GalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private productService: ProductService
  ) {
    if (data.action === 'update') {
      // fill in gallery form
      this.displayData = data.data;
      this.id = data.data['prodjectId'];
      this.galleryForm.CustomerName = data.data['customerName'];
      this.galleryForm.eventtypeId = data.data['eventtype']['typeId'];
      this.galleryForm.Description = data.data['description'];
    }
    this.title = data.title;
    this.status = data.action;
  }

  ngOnInit() {
    this.getEventNames();
  }
  getEventNames() {
    this.productService.getEventType().subscribe(
      (res) => {
      this.events = res;
    }, (error) => {
      console.log(error);
    }
    );
  }
  // save changes to galleries
  save() {
    this.isLoading = true;
    this.galleryForm.eventtypeId = Number(this.galleryForm.eventtypeId);
    this.productService.updateGallery(this.id, this.galleryForm).subscribe(
      (res) => {
        this.isLoading = false;
        this.dialogRef.close();
    }, (error) => {
      this.isLoading = false;
      console.log(error);
    }
    );
  }
  // create new gallery
  create() {
    this.isLoading = true;
    this.productService.addGallery(this.galleryForm).subscribe(
      (res) => {
        this.isLoading = false;
      this.dialogRef.close();
    }, (error) => {
      this.isLoading = false;
      console.log(error);
    }
    );
  }
  // close this dialog
  close() {
    this.dialogRef.close();
  }
  // select gallery image
  onFileSelected(e) {
    this.selectedImg = <File>e.target.files[0];
    if (this.selectedImg == null) {
      this.isImageEmpty = true;
    } else {
      this.isImageEmpty = false;
    }
  }
  // upload gallery image
  onUpload() {
    if (this.selectedImg == null) {
      this.isImageEmpty = true;
    } else {
      this.isImageEmpty = false;
      this.isLoading = true;
      const fd = new FormData();
      fd.append('image', this.selectedImg, this.selectedImg.name);
      fd.append('ProjectId', JSON.stringify(this.id));
      this.productService.addGalleryImg(fd).subscribe((res) => {
        this.isLoading = false;
        this.feedbackMessage = res['data'];
        this.getGalleryImages();
        this.imageInput.nativeElement.value = null;
      }, (error) => {
        this.isLoading = false;
        this.feedbackMessage = 'upload failed'
        console.log(error);
      });
    }
  }
  // go to editing gallery image panel
  goEditImage() {
    this.editImage = true;
    this.getGalleryImages();
  }
  // go to editing gallery detail panel
  goEditProduct() {
    this.editImage = false;
  }
  // get images of gallery
  getGalleryImages() {
    this.productService.getGalleryImg(this.id).subscribe(
      (res) => {
        this.imageList = res;
      }, (error) => {
        console.log(error);
      });
  }
  // delete image of gallery
  deleteImage(id: number) {
    this.isLoading = true;
    this.productService.deleteGalleryImg(id).subscribe(
      (res) => {
        this.isLoading = false;
        this.feedbackMessage = 'Delete Successfully'
        this.getGalleryImages();
      }, (error) => {
        this.isLoading = false;
        this.feedbackMessage = 'Delete Failed'
      });
  }
}
