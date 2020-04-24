import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course, HandledResponse } from './../../models/api.model';
import { Data } from './../../models/common.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UNHANDLED_ERROR_TEXT } from 'src/app/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.BASEURL;
  }


  postCourse(request: any): Observable<HandledResponse> {
    return this.http.post<HandledResponse>(`${this._url}/api/courses/v1/save`, request)
      .pipe(catchError((err: any) => {
        if (err.status) {
          throw err as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }

  getCourseDetail(id: string): Observable<Course> {
    return this.http.get<Data<Course>>(`${this._url}/api/courses/v1/${id}/detail`)
      .pipe(
        map((response: Data<Course>) => response.data),
        catchError((err: any) => {
          if (err.status) {
            throw err as HandledResponse;
          } else {
            throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
          }
        }));
  }


  updateCourse(id: string, request: any): Observable<HandledResponse> {
    return this.http.put<HandledResponse>(`${this._url}/api/courses/v1/${id}/update`, request)
      .pipe(
        catchError((err: any) => {
          if (err.status) {
            throw err as HandledResponse;
          } else {
            throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
          }
        }));
  }

  deleteCourse(id: string) {
    return this.http.delete<HandledResponse>(`${this._url}/api/courses/v1/${id}/delete`)
      .pipe(
        catchError((err: any) => {
          if (err.status) {
            throw err as HandledResponse;
          } else {
            throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
          }
        }));
  }

}
