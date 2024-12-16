import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureReportComponent } from './expenditure-report.component';

describe('ExpenditureReportComponent', () => {
  let component: ExpenditureReportComponent;
  let fixture: ComponentFixture<ExpenditureReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenditureReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
