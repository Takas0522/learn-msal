import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private appService: AppService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.appService.acquireToken().pipe(
      mergeMap(m => {
        const newReq = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${m}`
          }
        });
        return next.handle(newReq);
      })
    )
  }
}
