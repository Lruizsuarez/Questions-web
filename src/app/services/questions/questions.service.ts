import { Data } from './../../models/common.model';
import { UNHANDLED_ERROR_TEXT } from './../../utils/constants';
import { HandledResponse, Question } from './../../models/api.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService implements OnInit {

  private _url = environment.BASEURL;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  getQuestion(questionId: string): Observable<Question> {
    return this.http.get<Data<Question>>(`${this._url}/api/question/v1/${questionId}/find`)
      .pipe(
        map((response: Data<Question>) => response.data),
        catchError((err: any) => {
          if (err.error.status) {
            throw err.error as HandledResponse;
          } else {
            throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
          }
        }));
  }

  postQuestion(request: any, sectionId: string): Observable<HandledResponse> {
    return this.http.post<HandledResponse>(`${this._url}/api/question/v1/${sectionId}/create`, request)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }

  postSharedOption(request: any, sectionId: string): Observable<HandledResponse> {
    return this.http.post<HandledResponse>(`${this._url}/api/question/v1/option/${sectionId}/shared`, request)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }

  updateQuestion(request: any, questionId: string): Observable<HandledResponse> {
    return this.http.put<HandledResponse>(`${this._url}/api/question/v1/${questionId}/update`, request)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }

  deleteQuestion(questionId: string): Observable<HandledResponse> {
    return this.http.delete<HandledResponse>(`${this._url}/api/question/v1/${questionId}/update`)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }

  updateOption(request: any, optionId: string): Observable<HandledResponse> {
    return this.http.put<HandledResponse>(`${this._url}/api/question/v1/option/${optionId}/update`, request)
      .pipe(catchError((err: any) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }
}
