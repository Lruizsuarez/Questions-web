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

  constructor(private http: HttpClient, private storage: LocalStorageService) {
    this._url = environment.BASEURL;
  }


  callLoginService(authRequest: AuthRequest): Promise<void> {
    const requestHeaders = { 'content-type': 'application/json', 'login-flow': 'true' };

    return this.http.post<AuthResponse>(`${this._url}/authentication/v1/login`, authRequest, { headers: requestHeaders })
      .toPromise().then((authResponse: AuthResponse) => {
        this.storage.store(BEARER_KEY, authResponse.bearer);
        this.storage.store(BEARER_AUTH, JSON.stringify(authResponse.data));
      }).catch((err) => {
        if (err.error.status) {
          throw err.error as ErrorResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as ErrorResponse;
        }
      });
  }

  callLogoutService(): Promise<void> {
    return this.http.delete(`${this._url}/authentication/v1/logout`).toPromise()
      .then(() => {
        this.storage.clear();
      }).catch((err) => {
        if (err.error.stats) {
          throw err.error as ErrorResponse;
        } else {
          throw { code: 500, status: UNHANDLED_ERROR_TEXT } as ErrorResponse;
        }
      });
  }


}
