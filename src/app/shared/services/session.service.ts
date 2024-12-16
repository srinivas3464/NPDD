import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  getFromDateString(): string {
    throw new Error('Method not implemented.');
  }
  accessToken: any;
  lastLoginTime: any;
  userName: any;
  desigId: any;
  desigName: any;
  mobileNumber: any;
  rbkGroupId: any;
  districtId: any;
  districtName: any;
  mandalId: any;
  mandalName: any;
  villageId: any;
  villageName: any;
  societyId: any;
  societyName: any;
  divisionId: any;
  cookie: any;
  // Bankers Module
  ifscCode: any;
  bankName: any;

  // Farmers Registration Module
  rbkName: any;
  rbkId: any;
  ruralUrbanFlag: any;

  uniqueId: any;
  passwordUpdate: any;

  dpTodayDate = new Date();

  constructor() {
    this.setSession();
  }

  setSession(): void {
    this.accessToken = sessionStorage.getItem('accessToken');
    this.userName = sessionStorage.getItem('userName');
    this.lastLoginTime = sessionStorage.getItem('lastLoginTime');
    this.desigId = sessionStorage.getItem('desigId');
    this.desigName = sessionStorage.getItem('desigName');
    this.mobileNumber = sessionStorage.getItem('mobileNumber');
    this.rbkGroupId = sessionStorage.getItem('rbkGroupId');
    this.districtId = sessionStorage.getItem('districtId');
    this.districtName = sessionStorage.getItem('districtName');
    this.mandalId = sessionStorage.getItem('mandalId');
    this.mandalName = sessionStorage.getItem('mandalName');

    this.ifscCode = sessionStorage.getItem('ifscCode');
    this.bankName = sessionStorage.getItem('bankName');

    this.rbkName = sessionStorage.getItem('rbkName');
    this.rbkId = sessionStorage.getItem('rbkId');
    this.ruralUrbanFlag = sessionStorage.getItem('ruralUrbanFlag');

    this.uniqueId = sessionStorage.getItem('uniqueId');
    this.passwordUpdate = sessionStorage.getItem('passwordUpdate');
    this.villageId = sessionStorage.getItem('villageId');
    this.villageName = sessionStorage.getItem('villageName');
    this.societyId = sessionStorage.getItem('societyId');
    this.societyName = sessionStorage.getItem('societyName');
    this.divisionId = sessionStorage.getItem('divisionId');
    this.cookie = sessionStorage.getItem('appddcltoken');
  }

  clearSession(): void {
    this.accessToken = '';
    this.userName = '';
    this.lastLoginTime = '';
    this.desigId = '';
    this.desigName = '';
    this.mobileNumber = '';
    this.rbkGroupId = '';
    this.districtId = '';
    this.districtName = '';
    this.mandalId = '';
    this.mandalName = '';

    this.ifscCode = '';
    this.bankName = '';

    this.rbkName = '';
    this.rbkId = '';
    this.ruralUrbanFlag = '';

    this.uniqueId = '';
    this.passwordUpdate = '';
    this.villageId = '';
    this.villageName = '';
    this.societyId = '';
    this.divisionId = '';
  }

  getTodayDate(): Date {
    return this.dpTodayDate;
  }

  getDOBMaxDate(): Date {
    return this.dpTodayDate;
  }

  getDOBMinDate(): any {
    return '';
  }

  getLegalAgeMaxDate(): Date {
    const dt = new Date();
    dt.setFullYear(dt.getFullYear() - 18);
    return dt;
  }

  getTodayDateString(): string {
    const date = this.dpTodayDate;

    let day = '';
    const tempDay = date.getDate().toString();
    if (tempDay.length === 1) {
      day = '0' + tempDay;
    } else {
      day = tempDay;
    }

    let month = '';
    const tempMonth = (date.getMonth() + 1).toString();
    if (tempMonth.length === 1) {
      month = '0' + tempMonth;
    } else {
      month = tempMonth;
    }

    return day + '-' + month + '-' + date.getFullYear().toString();
  }

  getMaxScheduleDate(): any {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }

  getPreviousMonth(): Date {
    return new Date(2021, 8, 1);
  }

  getCurrentMonth(): string {
    const date = this.dpTodayDate;
    let month = '';
    const tempMonth = (date.getMonth() + 1).toString();
    if (tempMonth.length === 1) {
      month = '0' + tempMonth;
    } else {
      month = tempMonth;
    }

    return '01-' + month + '-' + date.getFullYear().toString();
  }


  getCurrentyear(): string {
    const date = this.dpTodayDate;
    let month = '';
    const tempMonth = (date.getFullYear() + 1).toString();
    if (tempMonth.length === 1) {
      month = '0' + tempMonth;
    } else {
      month = tempMonth;
    }

    return '01-01-' + date.getFullYear().toString();
  }
  getDateString(date: Date): string {
    let day = '';
    const tempDay = date.getDate().toString();
    if (tempDay.length === 1) {
      day = '0' + tempDay;
    } else {
      day = tempDay;
    }

    let month = '';
    const tempMonth = (date.getMonth() + 1).toString();
    if (tempMonth.length === 1) {
      month = '0' + tempMonth;
    } else {
      month = tempMonth;
    }

    return day + '-' + month + '-' + date.getFullYear().toString();
  }
}
