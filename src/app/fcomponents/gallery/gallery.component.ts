import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  gallery:any
  constructor(
    private route:ActivatedRoute,

  ) { }

  ngOnInit() {
    this.gallery = this.route.snapshot.params['id'];
  }

}