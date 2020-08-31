import { UNHANDLED_ERROR_TEXT } from './../../utils/constants';
import { Exam, HandledResponse } from './../../models/api.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Data } from 'src/app/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.BASEURL;
  }

  getExam(examId: string): Observable<Exam> {
    return this.http.get<Data<Exam>>(`${this._url}/api/exam/v1/${examId}/find`)
      .pipe(
        map((response: Data<Exam>) => response.data),
        catchError((err: any) => {
          if (err.error.status) {
            throw err.error as HandledResponse;
          } else {
            throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
          }
        }));
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
    return this.http.put<HandledResponse>(`${this._url}/api/exam/v1/${exam._id}/update`, exam)
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
