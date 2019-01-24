import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
  }

}
