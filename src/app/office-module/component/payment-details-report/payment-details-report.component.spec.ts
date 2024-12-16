import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsReportComponent } from './payment-details-report.component';

describe('PaymentDetailsReportComponent', () => {
  let component: PaymentDetailsReportComponent;
  let fixture: ComponentFixture<PaymentDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
