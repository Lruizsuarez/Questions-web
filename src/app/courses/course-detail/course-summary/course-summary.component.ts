import { Course } from './../../../models/api.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-course-summary',
  templateUrl: './course-summary.component.html',
  styleUrls: ['./course-summary.component.css']
})
export class CourseSummaryComponent implements OnInit {

  @Input() detail: Course;
  @Output() flip = new EventEmitter<void>();
  items: any[];
  NEW_COURSE_EMPTY_STATE = './../../../../assets/errors/bermuda-searching.png';

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        image: './../../../../assets/img/exam.png',
        title: 'Exams',
        footerInfo: 'create and manage your exams',
        countToolTip: `you have ${this.detail.exams_count} exams`,
        animated: false,
        count: this.detail.exams_count
      }, {
        image: './../../../../assets/img/sections.png',
        title: 'Sections',
        footerInfo: 'create sections of questions for multiple exams!',
        countToolTip: `you have ${this.detail.sections_count} sections and ${this.detail.sections_count} questions`,
        animated: false,
        count: this.detail.sections_count
      }, {
        image: './../../../../assets/img/students.png',
        title: 'Students',
        footerInfo: 'view your students information',
        countToolTip: `you have ${this.detail.students_count} students`,
        animated: true,
        count: this.detail.students_count
      }
    ];
  }

  performFlip() {
    this.flip.emit();
  }

  getFormattedDate(date: string): string {
    return date.replace(/\..*$/g, '').replace('T', '-');
  }

}
