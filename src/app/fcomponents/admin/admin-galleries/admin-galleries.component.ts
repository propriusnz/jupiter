import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { GalleryDialogComponent } from '../../AdminDialogs/galleryDialog/galleryDialog.component';


@Component({
  selector: 'app-admin-galleries',
  templateUrl: './admin-galleries.component.html',
  styleUrls: ['./admin-galleries.component.css']
})
export class AdminGalleriesComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

}
