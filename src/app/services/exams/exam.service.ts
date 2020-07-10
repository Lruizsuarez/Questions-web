import { UNHANDLED_ERROR_TEXT } from './../../utils/constants';
import { Exam, HandledResponse } from './../../models/api.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.BASEURL;
  }

  postExam(exam: Exam): Observable<HandledResponse> {
    return this.http.post<HandledResponse>(`${this._url}/api/exam/v1/${exam.course}/create`, exam)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }


  updateExam(exam: Exam): Observable<HandledResponse> {
    return this.http.post<HandledResponse>(`${this._url}/api/exam/v1/${exam.course}/update`, exam)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }


  deleteExam(exam: Exam): Observable<HandledResponse> {
    return this.http.post<HandledResponse>(`${this._url}/api/exam/v1/${exam.course}/create`, exam)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }

}
