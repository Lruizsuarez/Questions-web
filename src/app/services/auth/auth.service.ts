import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data } from './../../models/common.model';
import { User } from './../../models/user.model';
import { ErrorResponse } from './../../models/error.model';
import { LocalStorageService } from './../storage/local.storage.service';
import { AuthRequest, AuthResponse } from './../../models/auth.models';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BEARER_AUTH, BEARER_KEY, UNHANDLED_ERROR_TEXT } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url: string;
  private _currentUser: Observable<User>;

  constructor(private http: HttpClient, private storage: LocalStorageService) {
    this._url = environment.BASEURL;
    if (storage.hasKey(BEARER_KEY)) {
      this._currentUser = this.callUserInformation();
    }
  }


  public callLoginService(authRequest: AuthRequest): Promise<void> {
    const requestHeaders = { 'content-type': 'application/json' };

    return this.http.post<AuthResponse>(`${this._url}/authentication/v1/login`, authRequest, { headers: requestHeaders })
      .toPromise().then((authResponse: AuthResponse) => {
        this.storage.store(BEARER_KEY, authResponse.bearer);
        this.storage.store(BEARER_AUTH, JSON.stringify(authResponse.data));
        this._currentUser = this.callUserInformation();
      }).catch((err) => {
        if (err.error.status) {
          throw err.error as ErrorResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as ErrorResponse;
        }
      });
  }

  public callUserInformation(): Observable<User> {
    return this.http.get<Data<User>>(`${this._url}/api/user/v1/find`).pipe(map(user => user.data));
  }

  get currentUser(): Observable<User> {
    return this._currentUser;
  }

}
