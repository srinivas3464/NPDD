import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {             
  baseURL = '';
  LOGINbaseURL='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
     this.LOGINbaseURL = utils.baseUrl() + 'api/login/';
     this.baseURL = utils.baseUrl() + 'api/login/';
  }
       
  public downloadMentorApp() {
    const result: any = this.httpClient
      .get(`${this.baseURL}downloadMentorApp`)
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public getCaptcha() {
    const result: any = this.httpClient
      .get(`${this.LOGINbaseURL}GetCaptcha`)
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  // public getCaptcha() {
  //   const result: any = this.httpClient
  //     .post(`${this.baseURL}GetCaptchapost`,'')
  //     .pipe(retry(this.utils.env.API_RETRY_COUNT))
  //     .toPromise();
  //   return result;
  // }
 

  public token(req) {
    const result: any = this.httpClient
      .post(`${this.LOGINbaseURL}token`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public logout(req) {
    const result: any = this.httpClient
      .post(`${this.LOGINbaseURL}logout`, req, this.utils.getPostHttpOptionstoken()//getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
