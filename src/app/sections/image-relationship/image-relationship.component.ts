import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-relationship',
  templateUrl: './image-relationship.component.html',
  styleUrls: ['./image-relationship.component.css']
})
export class ImageRelationshipComponent implements OnInit {

  imageContent: string;
  constructor() { }

  ngOnInit() {
  }

  handleContextImageClick(image: string) {
    this.imageContent = image;
  }

}
