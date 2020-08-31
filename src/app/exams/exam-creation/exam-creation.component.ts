import { getSectionInfo } from 'src/app/utils/enum-section.types';
import { Section, HandledResponse, Exam } from './../../models/api.model';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ExamService } from 'src/app/services/exams/exam.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SIMPLE_ACTION_TEXT } from 'src/app/utils/constants';

@Component({
  selector: 'app-exam-creation',
  templateUrl: './exam-creation.component.html',
  styleUrls: ['./exam-creation.component.css']
})
export class ExamCreationComponent implements OnInit {

  $sections: Observable<Section[] | any>;

  cid: string;
  eid: string;
  examContent: Section[] | string[];
  wholeSections: Section[];
  error: HandledResponse;
  title: string;
  approveQuestions: number;


  constructor(
    private course: CoursesService,
    private activeRoute: ActivatedRoute,
    private exam: ExamService,
    private snackBar: MatSnackBar) {
    this.cid = this.activeRoute.snapshot.queryParams['cid'];
    this.eid = this.activeRoute.snapshot.queryParams['eid'];
    this.examContent = [];
  }

  ngOnInit() {
    if (this.eid) {
      this.exam.getExam(this.eid).subscribe((data: Exam) => {
        this.title = data.title;
        const sects = data.sections as Section[];
        this.examContent = sects.map((x) => x._id);
        this.approveQuestions = data.minimum_approve_questions;
      }, (err: HandledResponse) => {
        this.error = err;
      });
    }

    this.$sections = this.course.getCourseSections(this.cid)
      .pipe(map((data) => {
        if (this.eid) {
          this.calcSections(data);
        } else {
          this.wholeSections = data;
        }
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

  getSectionTitle(type: number) {
    return getSectionInfo(type).title;
  }

  getSectionRoute(type: number) {
    return getSectionInfo(type).route;
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  calcSections(data: Section[]) {
    const whole = [];
    const content = [];
    data.filter((x) => {
      if ((this.examContent as string[]).includes(x._id)) {
        content.push(x);
      } else {
        whole.push(x);
      }
    });
    this.examContent = content;
    this.wholeSections = whole;
  }


  handle() {
    let questions_count = 0;
    const sections: string[] = (this.examContent as Section[]).map(x => {
      questions_count += x.questions_count;
      return x._id;
    });

    const exam: Exam = {
      course: this.cid,
      title: this.title,
      minimum_approve_questions: this.approveQuestions,
      total_questions: questions_count,
      sections: sections
    };

    if (this.eid) {
      exam._id = this.eid;
      this.update(exam);
    } else {
      this.save(exam);
    }

  }

  save(req: Exam) {
    this.exam.postExam(req).subscribe((res: HandledResponse) => {
      this.snackBar.open(res.status, null, { duration: 5000, panelClass: ['successfull-snackbar'] });
    },
      (err: HandledResponse) => {
        this.snackBar.open(err.status, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
      });
  }

  update(req: Exam) {
    this.exam.updateExam(req).subscribe((res: HandledResponse) => {
      this.snackBar.open(res.status, null, { duration: 5000, panelClass: ['successfull-snackbar'] });
    },
      (err: HandledResponse) => {
        this.snackBar.open(err.status, SIMPLE_ACTION_TEXT, { duration: 5000, panelClass: ['error-snackbar'] });
      });
  }
}
