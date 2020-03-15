import { TEACHER_USER_BUTTON, STUDENT_USER_BUTTON, TEACHER_USER_BUTTON_DESC, STUDENT_USER_BUTTON_DESC } from './../../../utils/constants';
import { ErrorResponse } from './../../../models/error.model';
import { Observable, of } from 'rxjs';
import { Course } from './../../../models/user.model';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Observable<Course[] | any>;
  error: ErrorResponse = null;
  private isTeacher: boolean;
  GENERIC_ERROR_EMPTY_STATE = './../../../../../assets/errors/iconfinder_error_512541.png';

  constructor(private userInfo: UserService) {
    this.isTeacher = false;
  }

  ngOnInit() {
    if (this.userInfo.permissions.permission_create_course) {
      this.isTeacher = true;
      this.courses = this.userInfo.getCreatedCourses()
        .pipe(
          catchError((err: any) => {
            this.error = err.error as ErrorResponse;
            return of();
          }));
    } else {
      this.courses = this.userInfo.getEnrolledCourses()
        .pipe(
          catchError((err: any) => {
            this.error = err.error as ErrorResponse;
            return of();
          }));
    }

  }


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
