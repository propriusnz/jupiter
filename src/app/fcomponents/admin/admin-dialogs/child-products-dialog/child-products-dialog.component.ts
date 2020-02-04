import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-child-products-dialog',
  templateUrl: './child-products-dialog.component.html',
  styleUrls: ['./child-products-dialog.component.css']
})
export class ChildProductsDialogComponent implements OnInit {

  constructor(
	private dialogRef: MatDialogRef<ChildProductsDialogComponent>,
	private productservice: ProductService,
  ) { }

  ngOnInit() {
  }

}