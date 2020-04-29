import { BEARER_KEY, UNHANDLED_ERROR_TEXT } from './../utils/constants';
import { SessionStorageService } from '../services/storage/session.storage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: SessionStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('login-flow')) {
      return next.handle(request);
    }

    const token = this.storage.get(BEARER_KEY);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'content-type': 'application/json'
        }
      });

      return next.handle(request);
    } else {
      throw new HttpErrorResponse({
        error: { code: 412, status: UNHANDLED_ERROR_TEXT },
        headers: null,
        status: 412,
        statusText: 'Token-not-found',
        url: request.url
      });
    }
  }
}
