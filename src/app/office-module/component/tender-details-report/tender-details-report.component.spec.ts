import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDetailsReportComponent } from './tender-details-report.component';

describe('TenderDetailsReportComponent', () => {
  let component: TenderDetailsReportComponent;
  let fixture: ComponentFixture<TenderDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
