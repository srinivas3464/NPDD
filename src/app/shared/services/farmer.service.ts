import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  baseURL = '';
  farmerURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'api/farmerModule/';
    this.farmerURL = utils.baseUrl() + 'api/mcuMapping/';
  }

  public vvFarmerDashboardCounts(req) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}vvFarmerDashboardCounts`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public vvFarmerCompletedList(req) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}vvFarmerCompletedList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerListByUniqueId(req) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerListByUniqueId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public vvFarmerDetailsByUid(req) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}vvFarmerDetailsByUid`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public searchByIFSC(req) {
    const result: any = this.httpClient
      .post(`${this.baseURL}searchByIFSC`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public farmerApprovalSub(req) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}farmerApprovalSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
