import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild("categorySelection") categorySelectionElement: ElementRef;
  allProducts: any = [];
  allCategories: any = [];
  typeName: any;
  typeTitle: string;
  selectedCate: string;
  errorMessage: string;
  typeId: number;
  categoryId: string;
  isLoading = false;
  groupedProducts: any = [];
  isProductsGrouped = false;
  baseImageLink = environment.baseLink;
  currentPageNumber = 0;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title
  ) {
    // Following section in constructor for SEO Purposes
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire' },
      { name: 'description', content: 'One stop event and party hire and services in Auckland.' },
    ]);
    this.titleService.setTitle('Luxe Dream Auckland Event and Party Hire | Hire');
  }

  // with initiation, if type 1 or (Hire) run function with category selection, If other types, simply get data from database
  initiation() {
    // See if is type 1
    this.hireFunction();
    // Else if not type 1
    this.servicePackageFunction();
  }


  hireFunction() {
    // Get category list from database
    // Get from database by categories
    this.indexDataService();
  }

  servicePackageFunction() {
    // Get from database by types
    this.indexDataService();
  }

  indexDataService() {
    // Pass to service
    // Service to determine if error or response

    // If response to processing data function
    this.dataToDisplay();
  }

  dataToDisplay() {
    // Process what data to display
  }

  // Below error change to this format

  ngOnInit() {
    this.routerSubscribe();
    // Watch the changes of route and reload component
    if (this.typeName === 'service') {
      this.sortByType(2);
    }
    if (this.typeName === 'package') {
      this.sortByType(3);
    }
    this.selectedCate = this.productService.getCategory();
    this.productService.getSelectedCategory().subscribe(
      res => {
        this.selectedCate = res;
      }
    );
  }
  routerSubscribe() {
    return this.route.params.subscribe(
      params => {
        this.typeId = this.route.snapshot.params['productTypeId'];
        this.categoryId = this.route.snapshot.params['categoryTypeId'];
        this.typeName = this.route.snapshot.data['some_data'];
        if (this.typeName === 'products') {
          this.getCategories(this.typeId);
          if (this.categoryId !== '0') {
            this.changeCate(this.categoryId);
          } else {
            this.sortByType(this.typeId);
          }
        }
      }
    );
  }
  // sort product by type => Hire | Service | Package
  sortByType(id: number) {
    this.isLoading = true;
    this.clearPageStatus();
    this.productService.indexType(id).subscribe(
      (res) => {
        this.isLoading = false;
        this.allProducts = res['data'];
        if (id === 1) {
          this.getCategories(this.typeId);
        }
        if (this.allProducts.length > 11) {
          this.groupProducts();
        }
      },
      (err) => { console.log(err), this.errorMessage = 'Server fault', this.isLoading = false; }
    );
  }
  // sort product by category
  changeCate(id, e?) {
    this.isLoading = true;
    this.clearPageStatus();
    if (e) {
      this.selectedCate = e.srcElement.innerHTML;
    }
    if (id === 0) {
      return this.sortByType(this.typeId);
    }
    return this.getCategoryById(id);
  }
  getCategoryById(id: number) {
    this.productService.indexCategoryId(id).subscribe((res) => {
      this.isLoading = false;
      this.allProducts = res;
      if (this.allProducts.length > 11) {
        this.groupProducts();
      }
    }, (error) => {
      this.isLoading = false;
      console.log(error);
    });
  }
  // Get all the categories => dropDown menu
  getCategories(typeId: number) {
    this.productService.getCategoryByType(typeId).subscribe((res) => {
      this.allCategories = res['productCategory'];
      this.typeTitle = res['typeName'];
      console.log(res);
    }, (error) => { console.log(error), this.errorMessage = 'Server fault'; });
  }
  // pagination
  groupProducts() {
    this.isProductsGrouped = true;
    for (let i = 0; i < this.allProducts.length; i += 12) {
      const mylist = this.allProducts.slice(i, i + 12);
      this.groupedProducts.push(mylist);
    }
    this.allProducts = this.groupedProducts[0];
  }
  changePage(page: number): void {
    this.currentPageNumber = page;
    this.allProducts = this.groupedProducts[page];
    this.categorySelectionElement.nativeElement.scrollIntoView();
  }
  clearPageStatus() {
    this.groupedProducts = [];
    this.isProductsGrouped = false;
  }
}
