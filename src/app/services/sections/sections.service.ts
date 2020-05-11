import { Data } from './../../models/common.model';
import { UNHANDLED_ERROR_TEXT } from 'src/app/utils/constants';
import { HandledResponse, Section } from './../../models/api.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.BASEURL;
  }


  getSection(sectionId: string): Observable<Section> {
    return this.http.get<Data<Section>>(`${this._url}/api/section/v1/${sectionId}/find`)
      .pipe(
        map((data: Data<Section>) => data.data),
        catchError((err: any) => {
          if (err.status) {
            throw err as HandledResponse;
          } else {
            throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
          }
        }));
  }


  postSection(request: any, courseId: string): Observable<HandledResponse> {
    return this.http.post<HandledResponse>(`${this._url}/api/section/v1/${courseId}/create`, request)
      .pipe(catchError((err: any) => {
        if (err.status) {
          throw err as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }


  updateSection(request: any, sectionId: string): Observable<HandledResponse> {
    return this.http.put<HandledResponse>(`${this._url}/api/section/v1/${sectionId}/update`, request)
      .pipe(catchError((err: any) => {
        if (err.status) {
          throw err as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }


  deleteSection(sectionId: string): Observable<HandledResponse> {
    return this.http.delete<HandledResponse>(`${this._url}/api/section/v1/${sectionId}/delete`)
      .pipe(catchError((err: any) => {
        if (err.status) {
          throw err as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }


  patchSharedOption(sectionId: string, optionId: string): Observable<HandledResponse> {
    return this.http.patch<HandledResponse>(`${this._url}/api/section/v1/${sectionId}/shared/${optionId}`, {})
      .pipe(catchError((err: any) => {
        if (err.status) {
          throw err as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }


  patchQuestion(sectionId: string, questionId: string): Observable<HandledResponse> {
    return this.http.patch<HandledResponse>(`${this._url}/api/section/v1/${sectionId}/question/${questionId}`, {})
      .pipe(catchError((err: any) => {
        if (err.status) {
          throw err as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      }));
  }

}
