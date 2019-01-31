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
    
    window.onscroll=function(){
      var h =document.documentElement.scrollTop||document.body.scrollTop;
      console.log(h*1.4);      
      var headerTop =document.getElementById("navbarId");            
      if( h >=70) {       //header.height= 70px;     
        headerTop.style.background="#fff";            
        headerTop.style.color="rgba(66,65,66,1)";            
      }else{    
        if(h<30){
          headerTop.style.background="rgba(255,255,255,0.0"+h*1.4+")";  
          headerTop.style.color="rgba(66,66,66,0.0"+h*1.4+")";  
          headerTop.style.height="130px";          
        }else if(h>30 && h<= 70){
          headerTop.style.background="rgba(255,255,255,0."+h*1.4+")"; 
          headerTop.style.color="rgba(66,66,66,0."+h*1.4+")";
          headerTop.style.height="60px";
          headerTop.style.transitionDuration="0.5s";  
   
        }            
   
      }        
    };
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
