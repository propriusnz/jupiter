import { Component, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // TODO $ is not defined
  num: number = 0;
  specialProducts: any = [];
  groupedSpecials: any = [];
  isBrowser: Boolean = false;
  windowResize :number
  @ViewChild('bgat') bgat: ElementRef;
  @ViewChild('imgScroll') imgScroll: ElementRef;
  @ViewChild('list') list: ElementRef;
  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    if(this.isBrowser){
      this.windowResize = window.innerWidth
      this.seperateSpecials()  
    }
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService,
    private meta: Meta,
    private titleService: Title,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      this.windowResize = window.innerWidth
    }
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire' },
      { name: 'description', content: 'One stop event and party hire and services in Auckland.' },
    ]);
    this.titleService.setTitle('Luxe Dream Auckland Event and Party Hire | Home');
  }

  ngOnInit() {
    // large screen
    if (this.isBrowser) {
      this.imgScroll.nativeElement.style.height = window.innerHeight - 160 + 'px';
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
    }
    this.getSpeicals();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
  }
  // controll scrolling speed
  backgroundscroll(e) {
    this.bgat.nativeElement.style.backgroundPosition = '0%' + e / 50 + '%';
  }

  getSpeicals() {
    this.productService.getSpecialProduct().subscribe(
      (res) => {
        this.specialProducts = res['data'];
        this.seperateSpecials();
      }, (error) => {
        console.log(error);
      }
    );
  }
  seperateSpecials() {
    this.groupedSpecials= []
    if (this.windowResize >= 768) {
      for (let i = 0; i < this.specialProducts.length; i += 4) {
        let mylist = this.specialProducts.slice(i, i + 4);
        this.groupedSpecials.push(mylist);
      }
    } else {
      for (let i = 0; i < this.specialProducts.length; i += 2) {
        let mylist1 = this.specialProducts.slice(i, i + 2);
        this.groupedSpecials.push(mylist1);
      }
    }
  }

}
