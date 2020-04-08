import { Router } from '@angular/router';
import { ErrorResponse } from './../../../models/error.model';
import { Observable, of, throwError } from 'rxjs';
import { Course } from './../../../models/user.model';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Observable<Course[] | any>;
  filteredCourses: Observable<Course[]>;
  error: ErrorResponse = null;
  isSearching = false;
  searchValue = '';
  filterError: string;
  isTeacher: boolean;
  GENERIC_ERROR_EMPTY_STATE = './../../../../../assets/errors/mirage-come-back-later.png';
  EMPTY_QUERY_EMPTY_STATE = './../../../../../assets/errors/flamenco-searching.png';

  constructor(private userInfo: UserService, private router: Router) {
    this.isTeacher = false;
  }

  ngOnInit() {
    if (this.userInfo.permissions.permission_create_course) {
      this.isTeacher = true;
      this.courses = this.userInfo.getCreatedCourses()
        .pipe(
          catchError((err: any) => {
            return this.handleError(err);
          }));
    } else {
      this.courses = this.userInfo.getEnrolledCourses()
        .pipe(
          catchError((err: any) => {
            return this.handleError(err);
          }));
    }
  }

  handleError(err: any): Observable<any> {
    this.error = err.error as ErrorResponse;
    if (this.error.code === 412) {
      this.router.navigate(['login']);
    }
    return of();
  }

  search() {
    this.isSearching = true;
    if (this.searchValue.length > 0) {
      this.filteredCourses =
        this.courses.pipe(
          map((courses: Course[]) => {
            const filteredData = courses.filter((course: Course) => course.title.toLowerCase().includes(this.searchValue.toLowerCase()));

            if (filteredData.length === 0) {
              this.filterError = `not found results for "${this.searchValue}"`;
              throwError(this.filterError);
              return;
            }
            this.filterError = null;
            return filteredData;
          }));
    } else {
      this.isSearching = false;
    }
  }
}
