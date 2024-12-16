import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseURL = '';
  commonURL = '';
  issueURL = '';
  pwdUpdURL='';
  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/login/';
    this.pwdUpdURL = utils.baseUrl() + 'api/pwdUpdate/';
    this.commonURL = utils.baseUrl() + 'api/common/';
    this.issueURL = utils.baseUrl() + 'api/issuesTracking/';
  }

  public passwordUpdate(req) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}passwordUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public passwordUpdatenew(req) {
    const result: any = this.httpClient
      .post(
        `${this.pwdUpdURL}passwordUpdatenew`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  public moduleList(req) {
    const result: any = this.httpClient
      .post(`${this.issueURL}moduleList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public issuesTrackingSub(req) {
    const result: any = this.httpClient
      .post(
        `${this.issueURL}issuesTrackingSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public issuesListByUser(req) {
    const result: any = this.httpClient
      .post(
        `${this.issueURL}issuesListByUser`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public issueTrackingVideo(req, videoFile: File) {
    const formData: FormData = new FormData();
    formData.append('videoFile', videoFile, videoFile.name);
    formData.append('issueTitle', req.issueTitle);
    formData.append('moduleId', req.moduleId);
    formData.append('description', req.description);
    formData.append('issueImg', req.issueImg);
    formData.append('insertedBy', req.insertedBy);
    formData.append('role', req.role);
    formData.append('districtId', req.districtId);
    formData.append('mandalId', req.mandalId);
    formData.append('rbkId', req.rbkId);
    formData.append('villageId', req.villageId);
    formData.append('issueType', req.issueType);
    formData.append('isFarmerIssue', req.isFarmerIssue);
    formData.append('farmerId', req.farmerId);
    formData.append('docPath', req.docPath);
    formData.append('docTitle', req.docTitle);
    const result: any = this.httpClient
      .post(
        `${this.issueURL}issueTrackingVideo`,
        formData,
        this.utils.getFileHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public mandalListByDistrictId(req) {
    const result: any = this.httpClient
      .post(
        `${this.commonURL}mandalListByDistrictId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public rbkListByMandalId(req) {
    const result: any = this.httpClient
      .post(
        `${this.commonURL}rbkListByMandalId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public societyListRbkId(req) {
    const result: any = this.httpClient
      .post(
        `${this.commonURL}societyListRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

}
