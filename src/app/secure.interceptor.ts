import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from './shared/services/session.service';
import { UtilsService } from './shared/services/utils.service';

@Injectable()
export class secureInterceptor implements HttpInterceptor {
  constructor(private utils: UtilsService, private session: SessionService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqCloned = this.handleBodyIn(request);
    const copiedReq = reqCloned;
    return next.handle(copiedReq);
  }

  handleBodyIn(req: HttpRequest<any>) {
    if (req.method.toLowerCase() === 'post') {
      if (req.body instanceof FormData) {
        if (this.utils.env.prod === 0) {
          req = req.clone({
            body: req.body,
          });
        } else if (this.utils.env.prod === 1) {
          const encryptedData = this.utils.encrypt(JSON.stringify(req.body));
          req = req.clone({
            body: {
              data: encryptedData,
            },
          });
        } else if (this.utils.env.prod === 2) {
          req = req.clone({
            body: req.body,
          });
        }
      } else {
        if (this.utils.env.prod === 0) {
          req = req.clone({
            body: req.body,
          });
        } else if (this.utils.env.prod === 1) {
          const encryptedData = this.utils.encrypt(JSON.stringify(req.body));
          req = req.clone({
            body: {
              data: encryptedData,
            },
          });
        } else if (this.utils.env.prod === 2) {
          req = req.clone({
            body: req.body,
          });
        }
      }
    }

    if (req.method.toLowerCase() === 'get') {
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.session.accessToken}`
        ),
      });
    }

    // if (req.method.toLowerCase() === 'get') {
    //   req = req.clone({
    //     params: req.params.set(tokenName, tokenName)
    //   });
    // }

    return req;
  }
}
