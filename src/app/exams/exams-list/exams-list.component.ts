import { Exam, HandledResponse } from './../../models/api.model';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.css']
})
export class ExamsListComponent implements OnInit {

  $exams: Observable<Exam[] | any>;
  cid: string;
  examsList: Exam[];
  searchList: Exam[];
  isSearching = false;
  searchKeyWord = '';
  error: HandledResponse;

  constructor(private course: CoursesService, private activeRoute: ActivatedRoute) {
    this.cid = this.activeRoute.snapshot.queryParams['cid'];
  }

  ngOnInit() {
    this.$exams = this.course.getCourseExams(this.cid)
      .pipe(map((data) => {
        this.examsList = data;
        return data;
      }),
        catchError((err) => {
          this.error = err;
          return of();
        }));
  }

  getFormattedDate(date: string): string {
    return date.replace(/\..*$/g, '').replace('T', '-');
  }

  search(event: any) {
    this.searchKeyWord = event.target.value;
    if (this.searchKeyWord.length > 0) {
      this.searchList = this.examsList.filter((exam: Exam) =>
        exam.title.toLowerCase().includes(this.searchKeyWord.toLowerCase()));
      this.isSearching = true;
    } else {
      this.isSearching = false;
    }
  }

}
