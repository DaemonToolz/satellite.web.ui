import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { AuthservicesService } from '../authservices.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {


  constructor(private _auth : AuthservicesService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._auth.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }


}

