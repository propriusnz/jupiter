import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  num:string = "1";

  constructor() { }

  ngOnInit() {
  }

}
