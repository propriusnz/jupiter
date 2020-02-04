import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../service/product.service";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})

export class AdminDashboardComponent implements OnInit {
  isLoadingCategory = false;
  categoryList: any;
  categoryForm: FormGroup;
  categoryItems: FormArray;
  feedbackMessage = "";
  displayedTypeData: Array<any>;
  selectedType: Array<any>;
  selectedTypeId: number;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadType();
  }

  loadType(): Promise<any> {
    this.isLoadingCategory = true;
    return this.productService
      .getProductType()
      .toPromise()
      .then(data => {
        this.isLoadingCategory = false;
        this.displayedTypeData = Object.values(data);
        // this.displayedTypeData = Object.values(data).filter(item => {
        //   return item.prodTypeId !== 2 && item.prodTypeId !== 3;
      })
      .catch(err => {
        console.log(err);
        this.isLoadingCategory = false;
      });
  }

  loadCategory(typeId: number) {
    this.selectedTypeId = typeId;
    // build category form
    this.categoryForm = this.formBuilder.group({
      categoryItems: this.formBuilder.array([])
    });
    // get categories
    this.selectedType = this.displayedTypeData.filter(
      item => item.prodTypeId === typeId
	);
	console.log(this.selectedType, typeof(this.selectedType));

    // add categories into formarray
    this.selectedType["0"].productCategory.forEach(prod => {
      const control = <FormArray>this.categoryForm.controls.categoryItems;
      control.push(
        this.formBuilder.group({
          categoryId: prod.categoryId,
          categoryName: prod.categoryName,
          prodTypeId: typeId
        })
      );
	});
  }

  addCategory(): void {
    const control = <FormArray>this.categoryForm.controls.categoryItems;
    control.push(
      this.formBuilder.group({
        categoryId: 0,
        categoryName: null,
        prodTypeId: this.selectedTypeId
      })
    );
  }

  updateCategory() {
    this.isLoadingCategory = true;
    const cateList = this.categoryForm.controls.categoryItems["value"];
    let cateUpdatedList = [];
    const id = 0;
    const categoryFormControls = this.categoryForm.controls.categoryItems[
      "controls"
    ];
    categoryFormControls.forEach(element => {
      if (element.dirty) {
        cateUpdatedList.push(element.value);
      }
    });
    // console.log('new cateList', cateUpdatedList);

    this.productService.updateCategory(id, cateUpdatedList).subscribe(
      res => {
        this.isLoadingCategory = false;
        this.feedbackMessage = "Save Successfully";
      },
      error => {
        this.isLoadingCategory = false;
        this.feedbackMessage = "Save Failed";
        console.log(error);
      }
    );
  }

  deleteCate(cate, i) {
    const control = <FormArray>this.categoryForm.controls.categoryItems;
    if (cate.value.categoryId === 0) {
      control.removeAt(i);
      this.feedbackMessage = "Delete Successfully";
    } else {
      this.isLoadingCategory = true;
      this.productService.deleteCategory(cate.value.categoryId).subscribe(
        res => {
          this.isLoadingCategory = false;
          this.feedbackMessage = "Delete Successfully";
          control.removeAt(i);
        },
        error => {
          this.isLoadingCategory = false;
          this.feedbackMessage = "Delete Failed";
          console.log(error);
        }
      );
    }
  }

  reload () {
	  location.reload();
  }
}