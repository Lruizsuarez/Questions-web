import { Question, Option } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiple-selection-question',
  templateUrl: './multiple-selection-question.component.html',
  styleUrls: ['./multiple-selection-question.component.css']
})
export class MultipleSelectionQuestionComponent implements OnInit {

  @Input() data: Question;
  @Input() whiteFields: boolean;
  @Input() options: number;

  @Output() created: EventEmitter<Question>;
  @Output() updated: EventEmitter<Question>;

  optionsArray: any[];
  isEditing: boolean;
  editionButtons: boolean;

  constructor() {
    this.isEditing = false;
    this.editionButtons = false;
    this.created = new EventEmitter();
    this.updated = new EventEmitter();
  }

  ngOnInit() {
    console.log('on init : ', this.data);
    if (this.data._id) {
      this.optionsArray = this.data.options as Option[];
    } else {
      this.optionsArray = Array(this.options).fill({ text: '' });
      this.data = { _id: undefined, question: '', options: [] };
      this.editionButtons = true;
    }
  }

  trackByPosition(i: number) {
    return i;
  }

  validateData() {
    return this.data._id;
  }

  addOptionText($event: any, index: number) {
    const prev = this.optionsArray[index];
    this.optionsArray.splice(index, 1, { text: $event.target.value, answer: prev.answer });
  }

  setAnswer(index: number) {
    const prev = this.optionsArray[index];
    this.optionsArray.splice(index, 1, { text: prev.text, answer: !prev.answer });
  }

  emitSave() {
    this.data.options = this.optionsArray;
    console.log('data save : ', this.data);
    this.created.emit(this.data);
  }

  emitUpdate() {
    this.data.options = this.optionsArray;
    console.log('data update : ', this.data);
    this.updated.emit(this.data);
  }

}
