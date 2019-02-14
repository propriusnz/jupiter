import { Component, OnInit,ElementRef, ViewChild,HostListener} from '@angular/core';
interface productList {
  productName:string;
  imgLink:string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  products:productList[] = [
    {productName: "product1", imgLink:"https://www.thebigletterco.com.au/wp-content/uploads/2013/10/1.jpg"},
    {productName: "product2", imgLink:"https://www.thebigletterco.com.au/wp-content/uploads/2013/10/2.jpg"},
    {productName: "product3",imgLink:"https://www.thebigletterco.com.au/wp-content/uploads/2013/10/3.jpg"},
    {productName: "product4",imgLink:"https://www.thebigletterco.com.au/wp-content/uploads/2013/10/4.jpg"}
  ]
  @ViewChild ('bgat') bgat:ElementRef
  constructor() { }

  ngOnInit() {
    window.onscroll = ()=>{
      let top1 = this.bgat.nativeElement.offsetTop;
      if (top1 - window.pageYOffset < window.innerHeight && top1>window.pageYOffset){
        console.log("Reached bgat");
        this.backgroundscroll(top1 - window.pageYOffset)
      }

    }
  }
  backgroundscroll(e){
    console.log(e)
    this.bgat.nativeElement.style.backgroundPosition = "0%"+ e/3 +"%"
  }
}
