import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  gallery:any



  constructor(
    private route:ActivatedRoute,
    private meta: Meta,
    private titleService: Title,
  ) {
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ])
    this.gallery = this.route.snapshot.params['id'];
    this.titleService.setTitle('Luxe Dream Auckland | '+ this.gallery +' event hire gallery');
  }

  ngOnInit() {
  }

}