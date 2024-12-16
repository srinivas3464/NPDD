import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialYearBudgetReportComponent } from './financial-year-budget-report.component';

describe('FinancialYearBudgetReportComponent', () => {
  let component: FinancialYearBudgetReportComponent;
  let fixture: ComponentFixture<FinancialYearBudgetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialYearBudgetReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialYearBudgetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
