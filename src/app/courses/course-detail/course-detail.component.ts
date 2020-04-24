import { catchError } from 'rxjs/operators';
import { HandledResponse } from './../../models/api.model';
import { Course } from './../../models/api.model';
import { Observable, of } from 'rxjs';
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
  $detail: Observable<Course> | any;
  error: HandledResponse;
  GENERIC_ERROR_EMPTY_STATE = './../../../../../assets/errors/mirage-come-back-later.png';

  constructor(private activeRoute: ActivatedRoute, private courses: CoursesService) {
    this.flip = activeRoute.snapshot.queryParams['init'];
    this.id = activeRoute.snapshot.params['id'];

    this.$detail = courses.getCourseDetail(this.id).pipe(
      catchError((err: any) => {
        console.log(err);
        this.error = err.error as HandledResponse;
        return of();
      })
    );
  }


  ngOnInit() {
  }

  toggleFlip() {
    this.flip = (this.flip === 'students') ? 'summary' : 'students';
  }
}
