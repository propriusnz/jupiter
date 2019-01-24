import { Component, OnInit ,HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isTop:boolean = true
  constructor() { }
  ngOnInit() {

  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let positionNav:number = window.pageYOffset
    if (positionNav <= 70){
      this.isTop = true;
    }else{
      this.isTop = false;

    }
  } 
}
