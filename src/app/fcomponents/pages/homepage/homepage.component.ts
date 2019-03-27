import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ProductService } from '../../../service/product.service'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  num: number = 0;
  specialProducts:any=[];
  groupedSpecials:any=[];
  @ViewChild ('bgat') bgat:ElementRef
  @ViewChild ('imgScroll') imgScroll:ElementRef
  @ViewChild ('list') list:ElementRef

  constructor(private productService : ProductService) { }

  ngOnInit() {
    // large screen
    console.log(window);
    this.imgScroll.nativeElement.style.height = window.innerHeight - 190 + 'px';
    // mobile screen
    if (window.innerWidth < 768) {
      this.imgScroll.nativeElement.style.height = window.innerHeight - 100 + 'px';
    }
    console.log(this.imgScroll);

    window.onscroll = () => {
      let top1 = this.bgat.nativeElement.offsetTop;
      if (top1 - window.pageYOffset < window.innerHeight && top1 + this.bgat.nativeElement.offsetHeight > window.pageYOffset) {
        this.backgroundscroll(window.pageYOffset);
      }
    };
    this.getSpeicals()
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
  }
  // controll scrolling speed
  backgroundscroll(e) {
    this.bgat.nativeElement.style.backgroundPosition = '0%' + e / 50 + '%';
  }

  getSpeicals(){
    this.productService.getSpecialProduct().subscribe(
      (res)=>{
        this.specialProducts = res['data'];
        this.seperateSpecials();
      },(error)=>{
        console.log(error);
      }
      )
  }
  seperateSpecials(){
    for (let i = 0; i<this.specialProducts.length; i+=4){
      let mylist = this.specialProducts.slice(i, i+4);
      this.groupedSpecials.push(mylist);
    }
    console.log(this.groupedSpecials);
  }

}
