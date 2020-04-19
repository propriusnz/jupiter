import { Component, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { environment } from '../../../../environments/environment.prod';
import { MatDialog } from '@angular/material';
import { PopupDialogComponent } from '../../basic/user-dialog/popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  video:any;
  num = 0;
  specialProducts: any = [];
  groupedSpecials: any = [];
  isBrowser: Boolean = false;
  windowResize: number;
  baseImageLink = environment.baseLink;
  displayedCarouselImages: any;
  @ViewChild('bgat', { static: true }) bgat: ElementRef;
  @ViewChild('list', { static: false }) list: ElementRef;
  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    if (this.isBrowser) {
      this.windowResize = window.innerWidth;
      this.separateSpecials();
    }
  }
  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService,
    private meta: Meta,
    private titleService: Title,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      this.windowResize = window.innerWidth;
    }
    this.meta.addTags([
      {
        name: 'keywords',
        content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'
      },
      {
        name: 'description',
        content: 'One stop event and party hire and services in Auckland. #1 best event hire company in Auckland, we work for weddings, birthday parties, bachelor parties, and all sort of events.'
      },
    ]);
    this.titleService.setTitle('Luxe Dream Auckland Event and Party Hire | Home');
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {  
    return
  }
  if(!('isVisited' in sessionStorage)){
    this.popupDialog()
  }

  this.getVideo()

    // large screen
    if (this.isBrowser) {
      window.onscroll = () => {
        const top1 = this.bgat.nativeElement.offsetTop;
        if (top1 - window.pageYOffset < window.innerHeight && top1 + this.bgat.nativeElement.offsetHeight > window.pageYOffset) {
          this.backgroundScroll(window.pageYOffset);
        }
      };
    }
    this.getSpecials();
    this.getCarouselImages();
  }

  popupDialog(){
    sessionStorage.setItem('isVisited','1')
    this.dialog.open(PopupDialogComponent,{
        width: '600px',
        height: '600px',
      });
  }

  // control scrolling speed
  backgroundScroll(e) {
    this.bgat.nativeElement.style.backgroundPosition = '0%' + e / 50 + '%';
  }
  // get all the products on special
  getSpecials() {
    this.productService.getSpecialProduct().subscribe(
      (res) => {
        this.specialProducts = res['data'];
        this.separateSpecials();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // separate special products into groups
  separateSpecials() {
    this.groupedSpecials = [];
    if (this.windowResize >= 768) {
      // four special products in each group on large screen
      for (let i = 0; i < this.specialProducts.length; i += 4) {
        const myList = this.specialProducts.slice(i, i + 4);
        this.groupedSpecials.push(myList);
      }
    } else {
      // two special products in each group on mobile screen
      for (let i = 0; i < this.specialProducts.length; i += 2) {
        const myList1 = this.specialProducts.slice(i, i + 2);
        this.groupedSpecials.push(myList1);
      }
    }
  }
  getCarouselImages() {
    this.productService.getHomepageCarousel().subscribe((res) => {
      this.displayedCarouselImages = res;
    }, (err) => {
      console.log(err);
    });
  }

  getVideo(){
    this.productService.getVideos().subscribe(
      (res)=>{console.log(res), this.video = this.sanitizer.bypassSecurityTrustResourceUrl(res[0].url) },
      (err)=>{console.warn(err) }
  )
  }
}
