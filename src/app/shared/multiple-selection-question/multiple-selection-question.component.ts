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
    return this.data._id !== undefined && !this.isEditing;
  }

  addOptionText($event: any, index: number) {
    const prev = this.optionsArray[index];
    const mutatedObject = { _id: prev._id, text: $event.target.value, answer: prev.answer, updated: undefined };

    if (this.data._id) {
      mutatedObject.updated = true;
    }
    this.optionsArray.splice(index, 1, mutatedObject);
  }

  setAnswer(index: number) {
    const prev = this.optionsArray[index];
    const mutatedObject = { _id: prev._id, text: prev.text, answer: !prev.answer, updated: undefined };

    if (this.data._id) {
      mutatedObject.updated = true;
    }

    this.optionsArray.splice(index, 1, mutatedObject);
  }

  emitSave() {
    this.data.options = this.optionsArray;
    this.created.emit(this.data);
    this.editionButtons = false;
  }

  emitUpdate() {
    this.data.options = this.optionsArray;
    this.updated.emit(this.data);
    this.editionButtons = false;
  }

}
