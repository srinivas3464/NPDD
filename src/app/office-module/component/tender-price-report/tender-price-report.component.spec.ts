import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderPriceReportComponent } from './tender-price-report.component';

describe('TenderPriceReportComponent', () => {
  let component: TenderPriceReportComponent;
  let fixture: ComponentFixture<TenderPriceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderPriceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderPriceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
