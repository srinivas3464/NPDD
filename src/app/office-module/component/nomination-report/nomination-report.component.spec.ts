import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationReportComponent } from './nomination-report.component';

describe('NominationReportComponent', () => {
  let component: NominationReportComponent;
  let fixture: ComponentFixture<NominationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
