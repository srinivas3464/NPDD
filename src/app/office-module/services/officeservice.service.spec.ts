import { TestBed } from '@angular/core/testing';

import { OfficeserviceService } from './officeservice.service';

describe('OfficeserviceService', () => {
  let service: OfficeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
