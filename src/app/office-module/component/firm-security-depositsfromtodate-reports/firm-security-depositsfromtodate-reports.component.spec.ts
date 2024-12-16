import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmSecurityDepositsfromtodateReportsComponent } from './firm-security-depositsfromtodate-reports.component';

describe('FirmSecurityDepositsfromtodateReportsComponent', () => {
  let component: FirmSecurityDepositsfromtodateReportsComponent;
  let fixture: ComponentFixture<FirmSecurityDepositsfromtodateReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmSecurityDepositsfromtodateReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmSecurityDepositsfromtodateReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
