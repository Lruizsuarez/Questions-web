import { LocalStorageService } from './../storage/local.storage.service';
import { AuthRequest, AuthUserResponse, AuthResponse } from './../../models/auth.models';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BEARER_AUTH, BEARER_KEY } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.BASEURL;

  constructor(private http: HttpClient, private storage: LocalStorageService) {
  }


  public callLoginService(authRequest: AuthRequest): Promise<AuthUserResponse> {
    const requestHeaders = { 'content-type': 'application/json' };

    return this.http.post<AuthResponse>(`${this.url}/authentication/v1/login`, authRequest, { headers: requestHeaders })
      .toPromise().then((authResponse: AuthResponse) => {
        this.storage.store(BEARER_KEY, authResponse.bearer);
        this.storage.store(BEARER_AUTH, JSON.stringify(authResponse.data.permissions));
        return authResponse.data;
      });
  }




}
