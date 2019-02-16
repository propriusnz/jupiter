import { Component, OnInit,ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @ViewChild ('bgat') bgat:ElementRef
  constructor() { }

  ngOnInit() {
    window.onscroll = ()=>{
      let top1 = this.bgat.nativeElement.offsetTop;
      if (top1 - window.pageYOffset < window.innerHeight && top1+this.bgat.nativeElement.offsetHeight>window.pageYOffset){
        this.backgroundscroll(top1 - window.pageYOffset)
      }

    }
  }
  backgroundscroll(e){
    this.bgat.nativeElement.style.backgroundPosition = "0%"+ e/3 +"%"
  }
}
