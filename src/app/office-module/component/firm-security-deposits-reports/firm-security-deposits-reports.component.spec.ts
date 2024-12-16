import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmSecurityDepositsReportsComponent } from './firm-security-deposits-reports.component';

describe('FirmSecurityDepositsReportsComponent', () => {
  let component: FirmSecurityDepositsReportsComponent;
  let fixture: ComponentFixture<FirmSecurityDepositsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmSecurityDepositsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmSecurityDepositsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
