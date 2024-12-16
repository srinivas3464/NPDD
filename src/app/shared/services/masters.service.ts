import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MastersService {
  maritalStatusList = [
    {
      NAME: 'MARRIED',
    },
  ];

  villageClassificationList = [
    {
      NAME: 'URBAN',
    },
    {
      NAME: 'HAMLET',
    },
    {
      NAME: 'HABITATION',
    },
    {
      NAME: 'REVENUE',
    },
    {
      NAME: 'PANCHAYAT',
    },
  ];

  networkList = [
    {
      NAME: 'AIRTEL',
    },
    {
      NAME: 'JIO',
    },
    {
      NAME: 'IDEA',
    },
    {
      NAME: 'VODAFONE',
    },
    {
      NAME: 'BSNL',
    },
  ];

  natureOfUnitList = [
    {
      NAME: 'Live Stock-SHEEP',
    },
    {
      NAME: 'Live Stock-GOAT',
    },
    {
      NAME: 'Live Stock-COW',
    },
    {
      NAME: 'Live Stock-BUFFALO',
    },
  ];

  invalidNumbers = [
    '6666666666',
    '7777777777',
    '8888888888',
    '9999999999',
    '9848022338',
    '7111111111',
    '9100000000',
    '9800000000',
    '9000000000',
    '9222222222',
    '9888888888',
    '9848012345',
    '9999999990',
    '9123456789',
    '9876543210',
    '9111111111',
  ];

  monthList = [
    {
      NAME: 'JANUARY',
      ID: '01',
    },
    {
      NAME: 'FEBRUARY',
      ID: '02',
    },
    {
      NAME: 'MARCH',
      ID: '03',
    },
    {
      NAME: 'APRIL',
      ID: '04',
    },
    {
      NAME: 'MAY',
      ID: '05',
    },
    {
      NAME: 'JUNE',
      ID: '06',
    },
    {
      NAME: 'JULY',
      ID: '07',
    },
    {
      NAME: 'AUGUST',
      ID: '08',
    },
    {
      NAME: 'SEPTEMBER',
      ID: '09',
    },
    {
      NAME: 'OCTOBER',
      ID: '10',
    },
    {
      NAME: 'NOVEMBER',
      ID: '11',
    },
    {
      NAME: 'DECEMBER',
      ID: '12',
    },
  ];

  constructor() {}
}
