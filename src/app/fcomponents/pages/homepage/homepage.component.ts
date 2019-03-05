import { Component, OnInit,ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  num:number = 0;
  @ViewChild ('bgat') bgat:ElementRef
  @ViewChild ('imgScroll') imgScroll:ElementRef
  @ViewChild ('list') list:ElementRef

  constructor() { }

  ngOnInit() {
    //large screen
    console.log(window);
    this.imgScroll.nativeElement.style.height = window.innerHeight - 190 +"px";
    //mobile screen
    if (window.innerWidth<768){
      this.imgScroll.nativeElement.style.height = window.innerHeight - 100 +"px";
    }
    console.log(this.imgScroll);
    

    window.onscroll = ()=>{
      let top1 = this.bgat.nativeElement.offsetTop;
      if (top1 - window.pageYOffset < window.innerHeight && top1+this.bgat.nativeElement.offsetHeight>window.pageYOffset){
        this.backgroundscroll(top1 - window.pageYOffset)
      }
    }
  }
  ngAfterViewInit(): void {
  }
  backgroundscroll(e){
    this.bgat.nativeElement.style.backgroundPosition = "0%"+ e/3 +"%"
  }

}
