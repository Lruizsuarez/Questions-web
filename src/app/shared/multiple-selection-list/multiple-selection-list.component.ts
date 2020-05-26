import { Question } from './../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-multiple-selection-list',
  templateUrl: './multiple-selection-list.component.html',
  styleUrls: ['./multiple-selection-list.component.css']
})
export class MultipleSelectionListComponent implements OnInit {

  @Input() data: Question[];
  @Input() whiteFields: boolean;
  @Input() options: number;

  @Output() questionCreated: EventEmitter<Question>;
  @Output() questionUpdated: EventEmitter<Question>;
  @Output() error: EventEmitter<string>;

  optionsArray: any[];

  constructor() {
    this.questionCreated = new EventEmitter();
    this.questionUpdated = new EventEmitter();
    this.error = new EventEmitter();
  }

  ngOnInit() {
    console.log('options  : ', this.options);
    this.optionsArray = Array(this.options);
  }

  validateData(question: Question) {
    return question._id;
  }

}
