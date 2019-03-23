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
  // allCategories: any = ['Chairs and Covers', 'Candles and Candleholders', 'Dinnerware and Glassware', 'Bouncing castle', 'Letter and numbers', 'Plinth', 'Backdrop']
  typeCode:number;
  errorMessage:string;

  // title Price CategroyName ProdTypeName Description
  //   hireData:any[] = [
  //     {Title:'Golden Glassline Plate',Price:5.00,CategroyName:'Plates, Dining ware',Description:'Dine with our luxery european styled glass and golden lined plates'},
  //     {Title:'Classic Letter Range',Price:150.00,CategroyName:'Plates, Dining ware',Description:'Dine with our luxery european styled glass and golden lined plates'},
  //     {Title:'Classic Number',Price:160.00,CategroyName:'Plates, Dining ware',Description:'Dine with our luxery european styled glass and golden lined plates'},
  //     {Title:'Deluxe Letter Range',Price:170.00,CategroyName:'Plates, Dining ware',Description:'Dine with our luxery european styled glass and golden lined plates'},
  //     {Title:'Deluxe Number Range',Price:180.00,CategroyName:'Plates, Dining ware',Description:'Dine with our luxery european styled glass and golden lined plates'}
  //   ];
  //   serviceData:any[]=[
  //     {Title:'Signature Letter Range',Price:250.00,CategroyName:'serviceStyle1',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
  //     {Title:'Illuminated LOVE',Price:210.00,CategroyName:'serviceStyle2',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
  //     {Title:'LOVE in White',Price:230.00,CategroyName:'serviceStyle3',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
  //     {Title:'Mr & Mrs',Price:220.00,CategroyName:'serviceStyle4',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'}
  //   ];
  //   packageData:any[]=[
  //     {Title:'Illuminated Heart',Price:330.00,CategroyName:'packageStyle1',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
  //     {Title:'Giant WoodenLOVE',Price:300.00,CategroyName:'packageStyle2',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
  //     {Title:'Hot Dog/Food Station',Price:350.00,CategroyName:'packageStyle3',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
  //     {Title:'White Branding',Price:320.00,CategroyName:'packageStyle4',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'},
  //     {Title:'Food Station',Price:290.00,CategroyName:'packageStyle5',Description:'Lighting up a birthday with candles is so last century; get these illuminated numbers to add some celebratory glow to your next birthday event.'}
  //  ];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.typeName = this.route.snapshot.data['some_data'];
    console.log(this.typeName)
    if (this.typeName == 'hire') {
      this.typeCode = 1;
    }
    if (this.typeName == 'service') {
      this.typeCode = 2;
    }
    if (this.typeName == "package") {
      this.typeCode = 3;
    }

    this.productService.indexType(this.typeCode).subscribe(
      (res) => {
        //console.log(res);
        this.allProducts = res['product']
        console.log(this.allProducts)
        if (this.typeCode ==1){
          this.getCategories()
        }
      },
      (err) => {console.log(err),this.errorMessage = 'Server fault'}
      )

      this.selectedCate = "All Products"
    }

  changeCate(id,e) {
    // console.log(e)
    // this.selectedCate = e.srcElement.innerHTML;
    // if (this.selectedCate == "Dinnerware and Glassware"){
    //   this.allProducts = [];
    //   this.allProducts.push(this.hireData[0]);
    // }else{
    //   this.allProducts = [];
    //   this.allProducts = this.hireData;
    // }
    this.selectedCate = e.srcElement.innerHTML
    this.productService.indexCategoryId(id).subscribe((res)=>{
      this.allProducts = res['product']
      console.log(this.allProducts)
    },(error)=>{
      console.log(error)
    })
  }
  getCategories(){
    this.productService.indexCategory().subscribe((res)=>{
      this.allCategories = res
      console.log(this.allCategories);
    },(error)=>{console.log(error),this.errorMessage = 'Server fault'})
  }
  sortByCategory(id){
    this.productService.indexCategoryId(id).subscribe((res)=>{
      console.log(res)
      this.allProducts = res['product']
    },(error)=>{console.log(error),this.errorMessage = 'Server fault'})
  }
}
