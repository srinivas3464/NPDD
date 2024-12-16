import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDetailsTodayReportComponent } from './tender-details-today-report.component';

describe('TenderDetailsTodayReportComponent', () => {
  let component: TenderDetailsTodayReportComponent;
  let fixture: ComponentFixture<TenderDetailsTodayReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderDetailsTodayReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDetailsTodayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
