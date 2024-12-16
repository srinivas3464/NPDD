import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingDetailsReportComponent } from './proceeding-details-report.component';

describe('ProceedingDetailsReportComponent', () => {
  let component: ProceedingDetailsReportComponent;
  let fixture: ComponentFixture<ProceedingDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedingDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
