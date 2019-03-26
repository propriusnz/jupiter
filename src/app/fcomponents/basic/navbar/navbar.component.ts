import { Component, OnInit ,HostListener } from '@angular/core';
import { ProductService } from '../../../service/product.service'
declare var $: any;

@Component({
  selector: 'app-navbar', 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  allCategories:any = []
  isTop:boolean = true;
  smallwindow:boolean=true;
  constructor(private productService : ProductService) { }
  ngOnInit() {
    $('.navbar-nav>li>a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
  })

    this.getCategories()
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let positionNav:number = window.pageYOffset
    
    if (positionNav <= 70){
      this.isTop = true;
    }else{
      this.isTop = false;

    }
  } 
  getCategories(){
    this.productService.indexCategory().subscribe((res)=>{
      this.allCategories = res
      console.log(this.allCategories);
    },(error)=>{console.log(error)})
  }
  


  

}
