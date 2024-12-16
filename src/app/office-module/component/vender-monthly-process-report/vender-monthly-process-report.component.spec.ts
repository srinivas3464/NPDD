import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderMonthlyProcessReportComponent } from './vender-monthly-process-report.component';

describe('VenderMonthlyProcessReportComponent', () => {
  let component: VenderMonthlyProcessReportComponent;
  let fixture: ComponentFixture<VenderMonthlyProcessReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenderMonthlyProcessReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderMonthlyProcessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
