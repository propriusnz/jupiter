import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  isLoadingCategory = false;
  categoryList: any;
  categoryForm: FormGroup;
  categoryItems: FormArray;
  feedbackMessage = '';

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadCategory();
  }

    loadCategory() {
    this.isLoadingCategory = true;
    // build category form
    this.categoryForm = this.formBuilder.group({
      categoryItems: this.formBuilder.array([])
    });
    // get categories
    this.productService.indexCategory().subscribe(
      (res) => {
        this.isLoadingCategory = false;
        this.categoryList = res;
        // add categories into formarray
        this.categoryList.forEach(prod => {
          const control = <FormArray>this.categoryForm.controls.categoryItems;
          control.push(
            this.formBuilder.group({
              categoryId: prod.categoryId,
              categoryName: prod.categoryName
            })
          );
        });
      }, (error) => {
        this.isLoadingCategory = false;
        console.log(error);
      }
    );
  }

  addCategory() {
    const control = <FormArray>this.categoryForm.controls.categoryItems;
    control.push(
      this.formBuilder.group({
        categoryId: 0,
        categoryName: null
      })
    );
  }
  
  updateCategory() {
    this.isLoadingCategory = true;
    const cateList = this.categoryForm.controls.categoryItems['value'];
    const id = 0;
    this.productService.updateCategory(id, cateList).subscribe((res) => {
      this.isLoadingCategory = false;
      this.feedbackMessage = 'Save Successfully';
    }, (error) => {
      this.isLoadingCategory = false;
      this.feedbackMessage = 'Save Failed';
      console.log(error);
    });
  }

  deleteCate(cate, i) {
    const control = <FormArray>this.categoryForm.controls.categoryItems;
    if (cate.value.categoryId === 0) {
      control.removeAt(i);
      this.feedbackMessage = 'Delete Successfully';
    } else {
      this.isLoadingCategory = true;
      this.productService.deleteCategory(cate.value.categoryId).subscribe(
        (res) => {
          this.isLoadingCategory = false;
          this.feedbackMessage = 'Delete Successfully';
          control.removeAt(i);
        }, (error) => {
          this.isLoadingCategory = false;
          this.feedbackMessage = 'Delete Failed';
          console.log(error);
        }
      );
    }
  }
}
