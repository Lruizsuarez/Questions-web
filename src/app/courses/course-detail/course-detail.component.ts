import { catchError, map } from 'rxjs/operators';
import { HandledResponse, User } from './../../models/api.model';
import { Course } from './../../models/api.model';
import { Observable, of, forkJoin } from 'rxjs';
import { CoursesService } from './../../services/courses/courses.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  animations: [
    trigger('flipState', [
      state('students', style({
        transform: 'rotateY(180deg)'
      })),
      state('summary', style({
        transform: 'rotateY(0)'
      })),
      transition('summary => students', animate('500ms ease-out')),
      transition('students => summary', animate('500ms ease-in'))
    ])
  ]
})
export class CourseDetailComponent implements OnInit {

  public flip: string;
  private id: string;
  $data: Observable<{ detail: Course, students: User[] }>;
  error: HandledResponse;
  GENERIC_ERROR_EMPTY_STATE = './../../../../../assets/errors/mirage-come-back-later.png';

  constructor(private activeRoute: ActivatedRoute, private courses: CoursesService) {
    this.flip = this.activeRoute.snapshot.queryParams['init'];
    this.id = this.activeRoute.snapshot.params['id'];
  }


  ngOnInit() {
    const $detail = this.courses.getCourseDetail(this.id).pipe(
      catchError((err: any) => {
        this.error = err.error as HandledResponse;
        return of();
      })
    );

    const $students = this.courses.getCourseStudents(this.id).pipe(
      catchError((err: any) => {
        this.error = err.error as HandledResponse;
        return of();
      })
    );

    this.$data = forkJoin($detail, $students).pipe(
      map(([detail, students]: any[]) => {
        return { detail, students };
      })
    );
  }

  toggleFlip() {
    this.flip = (this.flip === 'students') ? 'summary' : 'students';
  }
}
