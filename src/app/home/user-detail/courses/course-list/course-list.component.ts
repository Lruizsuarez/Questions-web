import { Course } from './../../../../models/user.model';
import {
  TEACHER_USER_BUTTON,
  STUDENT_USER_BUTTON,
  TEACHER_USER_BUTTON_DESC,
  STUDENT_USER_BUTTON_DESC
} from './../../../../utils/constants';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  @Input() isTeacher: boolean;

  @Input() courses: Course[];

  constructor() { }

  ngOnInit() { }

  getFormattedDate(date: string): string {
    return date.replace(/\..*$/g, '').replace('T', '-');
  }

  getButtonUrl(): string {
    if (this.isTeacher) {
      return TEACHER_USER_BUTTON;
    }
    return STUDENT_USER_BUTTON;
  }

  getButtonDescription(): string {
    if (this.isTeacher) {
      return TEACHER_USER_BUTTON_DESC;
    }
    return STUDENT_USER_BUTTON_DESC;
  }

  getRole(): string {
    if (this.isTeacher) {
      return 'Teacher';
    }
    return 'Student';
  }

}
