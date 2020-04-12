import { environment } from './../../../environments/environment';
import { HandledResponse } from './../../models/error.model';
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


  postCourse(request: any): Promise<HandledResponse> {
    const requestHeaders = { 'content-type': 'application/json' };

    return this.http.post<HandledResponse>(`${this._url}/api/courses/v1/save`, request, { headers: requestHeaders }).toPromise()
      .catch((err: any) => {
        if (err.status) {
          throw err as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      });
  }

}
