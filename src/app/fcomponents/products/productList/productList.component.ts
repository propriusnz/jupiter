import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild("categorySelection", { static: false }) categorySelectionElement: ElementRef;
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
    private router:Router,
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
    if (this.typeName === 'package') {
      this.sortByType(3);
    }
    this.selectedCate = this.productService.getCategory();
    this.productService.getSelectedCategory().subscribe(
      (res) => {
        console.log(res)
        this.selectedCate = res;
      }
    );
  }
  routerSubscribe() {
    return this.route.params.subscribe(
      params => {
        this.clearPageStatus();
        this.typeId = this.route.snapshot.params['productTypeId'];
        this.categoryId = this.route.snapshot.params['categoryTypeId'];
        this.typeName = this.route.snapshot.data['some_data'];
        if (this.typeName !== 'package') {
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
        console.log(this.allProducts)
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

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  // Get all the categories => dropDown menu
  getCategories(typeId: number) {
    this.productService.getCategoryByType(typeId).subscribe((res) => {
      console.log(res)

      this.allCategories = res['productCategory'].sort(this.compareValues('categoryName', 'asc'))
      // this.allCategories = res['productCategory'];

      this.typeTitle = res['typeName'];
      if (Number(this.categoryId) === 0) {
        this.selectedCate = 'All ' + this.typeTitle;
      } else {
        this.selectedCate = Object.values(this.allCategories)
          .filter((v) => v['categoryId'] === Number(this.categoryId))[0]['categoryName'];
      }
    }, (error) => { console.log(error), this.errorMessage = 'Server fault'; });
  }

  // pagination
  groupProducts() {
    this.clearPageStatus();
    this.isProductsGrouped = true;
    for (let i = 0; i < this.allProducts.length; i += 12) {
      const mylist = this.allProducts.slice(i, i + 12);
      this.groupedProducts.push(mylist);
    }
    this.allProducts = this.groupedProducts[0];
    let pageNum = this.route.queryParams['value'].page
    console.log(pageNum)
    if ( !pageNum ) this.addQueryParams(0)
    else this.changePage(pageNum)
  }

  changePage(page: number): void {
    console.log(page)
    console.log(this.groupedProducts)

    this.currentPageNumber = page;
    this.allProducts = this.groupedProducts[page];
    this.categorySelectionElement.nativeElement.scrollIntoView();
    this.addQueryParams(page)
  }

  clearPageStatus() {
    // this.allProducts=[]
    this.groupedProducts = [];
    this.isProductsGrouped = false;
  }

  addQueryParams(pageNum){
    console.log(this.route)
    console.log(this.router)
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {
       page: pageNum
     },
    //  queryParamsHandling: 'merge',
     // preserve the existing query params in the route
    //  skipLocationChange: true
     // do not trigger navigation
   });
  }

}
