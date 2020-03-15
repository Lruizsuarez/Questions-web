import { Data } from './../../models/common.model';
import { User, Course, Activity } from './../../models/user.model';
import { BEARER_KEY, BEARER_AUTH } from './../../utils/constants';
import { LocalStorageService } from './../storage/local.storage.service';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthAccess } from 'src/app/models/auth.models';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string;
  private _currentUser: Observable<User>;

  constructor(private http: HttpClient, private storage: LocalStorageService) {
    this._url = environment.BASEURL;
    if (storage.hasKey(BEARER_KEY)) {
      this._currentUser = this.callUserInformation();
    }
  }


  get currentUser(): Observable<User> {
    return this._currentUser;
  }

  callUserInformation(): Observable<User> {
    return this.http.get<Data<User>>(`${this._url}/api/user/v1/find`).pipe(map(user => user.data));
  }

  getCreatedCourses(): Observable<Course[]> {
    return this.http.get<Data<Course[]>>(`${this._url}/api/user/v1/own`).pipe(map(courses => courses.data));
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Data<Course[]>>(`${this._url}/api/user/v1/enrolled`).pipe(map(courses => courses.data));
  }

  getActivity(): Observable<Activity[]> {
    return this.http.get<Data<Activity[]>>(`${this._url}/api/user/v1/activity`).pipe(map(activities =>  activities.data));
  }


  get permissions(): AuthAccess {
    return this.storage.getAsJson(BEARER_AUTH).permissions as AuthAccess;
  }

}
