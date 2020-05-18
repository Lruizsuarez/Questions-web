import { Question } from './../../models/api.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-relationship-question',
  templateUrl: './relationship-question.component.html',
  styleUrls: ['./relationship-question.component.css']
})
export class RelationshipQuestionComponent implements OnInit {

  @Input() data: Question;
  @Input() creationFlow: boolean;

  @Output() created: EventEmitter<Question>;
  @Output() edited: EventEmitter<Question>;
  @Output() error: EventEmitter<String>;
  @Output() answerSelection: EventEmitter<Question>;

  hasData = true;
  isEditing = false;

  constructor() {
    this.created = new EventEmitter();
    this.edited = new EventEmitter();
    this.error = new EventEmitter();
    this.answerSelection = new EventEmitter();
  }

  ngOnInit() {
    if (!this.data) {
      this.hasData = false;
      this.isEditing = true;
      this.data = { _id: '', question: '', options: [] };
    }
  }


  editQuestion() {
    if (this.data.question.length === 0) {
      this.error.emit('please put valid values');
      return;
    }
    console.log('id : ', this.data._id);
    this.edited.emit(this.data);
    this.isEditing = false;
  }

  saveQuestion() {
    if (this.data.question.length === 0) {
      this.error.emit('please put valid values');
      return;
    }

    if (!this.data.answer) {
      this.error.emit('please put an answer');
      return;
    }
    this.created.emit(this.data);
    this.isEditing = false;
  }

  selectAnswer() {
    this.answerSelection.emit(this.data);
  }

}
