import { Option, Photo } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-relationship-option',
  templateUrl: './relationship-option.component.html',
  styleUrls: ['./relationship-option.component.css']
})
export class RelationshipOptionComponent implements OnInit {

  @Input() data: Option;
  @Input() creationFlow: boolean;

  @Output() focusedImage: EventEmitter<Photo>;
  @Output() created: EventEmitter<Option>;
  @Output() edited: EventEmitter<Option>;
  @Output() error: EventEmitter<String>;

  hasData = true;
  isEditing = false;

  constructor() {
    this.focusedImage = new EventEmitter();
    this.created = new EventEmitter();
    this.edited = new EventEmitter();
    this.error = new EventEmitter();
  }

  ngOnInit() {
    if (!this.data) {
      this.hasData = false;
      this.isEditing = true;
      this.data = { _id: '', text: '' };
    }
  }

  saveImage(data: Photo) {
    this.data.image = data;
    if (!this.isEditing) {
      this.isEditing = !this.isEditing;
    }
  }

  focusImage() {
    this.focusedImage.emit(this.data.image);
  }

  editOption() {
    if (this.data.text.length === 0) {
      this.error.emit('please put valid values');
      return;
    }
    this.edited.emit(this.data);
    this.isEditing = false;
  }

  saveOption() {
    if (this.data.text.length === 0) {
      this.error.emit('please put valid values');
      return;
    }
    this.created.emit(this.data);
    this.isEditing = false;
  }

}
