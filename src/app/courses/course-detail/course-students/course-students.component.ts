import { SelectOption } from './../../../models/common.model';
import { User, Course } from './../../../models/api.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css'],
})
export class CourseStudentsComponent implements OnInit {

  @Output() flip = new EventEmitter<void>();
  @Input() detail: Course;
  @Input() students: User[];

  filters: SelectOption[];
  currFilter: string;
  searchKeyword: string;

  constructor() { }

  ngOnInit() {
    this.filters = [
      {
        label: 'none',
        icon: '😟',
        value: ''
      },
      {
        label: 'by user name',
        icon: '&#128583;',
        value: 'user_name'
      },
      {
        label: 'by email',
        icon: '&#128231;',
        value: 'email'
      },
      {
        label: 'by code',
        icon: '&#128199;',
        value: 'code'
      },
      {
        label: 'by last login',
        icon: '&#9200;',
        value: 'last_token_date'
      }
    ];
  }

  performFlip() {
    this.flip.emit();
  }

}
