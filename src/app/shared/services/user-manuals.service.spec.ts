import { TestBed } from '@angular/core/testing';

import { UserManualsService } from './user-manuals.service';

describe('UserManualsService', () => {
  let service: UserManualsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManualsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
