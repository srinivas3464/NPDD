import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetslipReportComponent } from './budgetslip-report.component';

describe('BudgetslipReportComponent', () => {
  let component: BudgetslipReportComponent;
  let fixture: ComponentFixture<BudgetslipReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetslipReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetslipReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
