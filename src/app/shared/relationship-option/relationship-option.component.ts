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
  @Input() index: number;
  @Input() showIndex: boolean;

  @Output() focusedImage: EventEmitter<Photo>;
  @Output() created: EventEmitter<Option>;
  @Output() edited: EventEmitter<Option>;
  @Output() error: EventEmitter<String>;
  @Output() selectedOption: EventEmitter<Option>;

  hasData = true;
  isEditing = false;

  constructor() {
    this.focusedImage = new EventEmitter();
    this.created = new EventEmitter();
    this.edited = new EventEmitter();
    this.error = new EventEmitter();
    this.selectedOption = new EventEmitter();
  }

  ngOnInit() {
    console.log('index : ', this.index);
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

  optionSelected() {
    if (!this.data._id) {
      this.error.emit('please create an option to make a relationship.');
      return;
    }
    this.selectedOption.emit(this.data);
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
    this.data.answer = true;
    this.created.emit(this.data);
    this.isEditing = false;
  }

}
