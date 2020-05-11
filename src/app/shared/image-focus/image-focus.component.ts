import { Photo } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-focus',
  templateUrl: './image-focus.component.html',
  styleUrls: ['./image-focus.component.css']
})
export class ImageFocusComponent implements OnInit {

  @Input() image: Photo;
  @Output() close: EventEmitter<void>;
  constructor() {
    this.close = new EventEmitter();
  }

  ngOnInit() {
  }


  performClose() {
    this.close.emit();
  }

}
