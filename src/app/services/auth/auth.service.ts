import { HandledResponse } from './../../models/api.model';
import { SessionStorageService } from '../storage/session.storage.service';
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

  constructor(private http: HttpClient, private storage: SessionStorageService) {
    this._url = environment.BASEURL;
  }

  callSignUpService(signUpRequest: any): Promise<HandledResponse> {
    const requestHeaders = { 'auth-flow': 'true' };

    return this.http.post<HandledResponse>(`${this._url}/authentication/v1/signup`, signUpRequest, { headers: requestHeaders }).toPromise()
      .catch((err) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      });
  }

  callLoginService(authRequest: AuthRequest): Promise<void> {
    const requestHeaders = { 'auth-flow': 'true' };

    return this.http.post<AuthResponse>(`${this._url}/authentication/v1/login`, authRequest, { headers: requestHeaders })
      .toPromise().then((authResponse: AuthResponse) => {
        this.storage.store(BEARER_KEY, authResponse.bearer);
        this.storage.store(BEARER_AUTH, JSON.stringify(authResponse.data));
      }).catch((err) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      });
  }

  callLogoutService(): Promise<void> {
    return this.http.delete(`${this._url}/authentication/v1/logout`).toPromise()
      .then(() => {
        this.storage.clear();
      }).catch((err) => {
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      });
  }


  callRefreshToken(): Promise<void> {
    return this.http.get(`${this._url}/authentication/v1/refresh`).toPromise()
      .then((response: any) => {
        this.storage.store(BEARER_KEY, response.bearer);
        return;
      }).catch((err) => {
        this.storage.clear();
        if (err.error.status) {
          throw err.error as HandledResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as HandledResponse;
        }
      });
  }


}
