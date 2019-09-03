import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { environment } from '../../../../environments/environment.prod'

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.css']
})
export class AdminImagesComponent implements OnInit {
  displayedImages: any;
  selectedImg: File = null;
  isImageEmpty = false;
  isLoading = true;
  feedbackMessage: string = null;
  baseImageUrl: string;
  @ViewChild('imageInput') imageInput: ElementRef;

  constructor(
    private productService: ProductService
  ) {
    this.baseImageUrl = environment.baseLink;
  }

  ngOnInit() {
    this.getImageData();
  }

  getImageData() {
    this.productService.getHomepageCarousel().subscribe((res) => {
      this.isLoading = false;
      this.displayedImages = res;
      // console.log(res);
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }
  onFileSelected(e) {
    this.selectedImg = <File>e.target.files[0];
    if (this.selectedImg == null) {
      this.isImageEmpty = true;
    } else {
      this.isImageEmpty = false;
    }
  }

  updateImageData() {
    if (this.selectedImg == null) {
      this.isImageEmpty = true;
    } else {
      this.isImageEmpty = false;
      this.isLoading = true;
      const fd = new FormData();
      fd.append('file', this.selectedImg, this.selectedImg.name);
      this.productService.addHomepageCarousel(fd).subscribe((res) => {
        this.isLoading = false;
        this.feedbackMessage = res['data'];
        this.getImageData();
        this.imageInput.nativeElement.value = null;
      }, (error) => {
        this.isLoading = false;
        this.feedbackMessage = 'upload failed';
        console.log(error);
      });
    }

  }

  removeImageData(id: number) {
    this.isLoading = true;
    this.productService.removeHomepageCarousel(id).subscribe(
      (res) => {
        this.isLoading = false;
        this.feedbackMessage = 'Delete Successfully';
        this.getImageData();
      }, (error) => {
        this.isLoading = false;
        this.feedbackMessage = 'Delete Failed';
      });

  }
}
