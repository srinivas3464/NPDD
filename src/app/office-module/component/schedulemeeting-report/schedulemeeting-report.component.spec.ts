import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulemeetingReportComponent } from './schedulemeeting-report.component';

describe('SchedulemeetingReportComponent', () => {
  let component: SchedulemeetingReportComponent;
  let fixture: ComponentFixture<SchedulemeetingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulemeetingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulemeetingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
