import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts: any = []
  allCategories:any = []
  typeName: any
  selectedCate: string = "All Products"
  errorMessage:string
  categoryId:number
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {

    // watch the changes of categoryId and reload component
    this.route.params.subscribe(
      params => {
        this.categoryId = this.route.snapshot.params['id'];
        this.typeName = this.route.snapshot.data['some_data'];
        this.getCategories()
        this.changeCate(this.categoryId)
      }
    );
    
    console.log(this.typeName)
    if (this.typeName == 'hire') {
      this.sortByType(1)
    }
    if (this.typeName == 'service') {
      this.sortByType(2)
    }
    if (this.typeName == "package") {
      this.sortByType(3)
    }
      //this.selectedCate = "All Products"
  }

  //sort product by type => Hire | Service | Package
  sortByType(id:number){
    this.productService.indexType(id).subscribe(
      (res) => {
        this.allProducts = res['product']
        console.log(this.allProducts)
        if (id ==1){
          this.getCategories()
        }
      },
      (err) => {console.log(err),this.errorMessage = 'Server fault'}
      )
  }
  //sort product by category
  changeCate(id,e?) {
    if(e){
      this.selectedCate = e.srcElement.innerHTML
    }
    this.productService.indexCategoryId(id).subscribe((res)=>{
      this.allProducts = res['product']
      this.selectedCate = res['categoryName']
      console.log(this.allProducts)
    },(error)=>{
      console.log(error)
    })
  }
  //Get all the categories => dropdown menu
  getCategories(){
    this.productService.indexCategory().subscribe((res)=>{
      this.allCategories = res
      console.log(this.allCategories);
    },(error)=>{console.log(error),this.errorMessage = 'Server fault'})
  }
}
