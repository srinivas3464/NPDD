import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficemenuReportComponent } from './officemenu-report.component';

describe('OfficemenuReportComponent', () => {
  let component: OfficemenuReportComponent;
  let fixture: ComponentFixture<OfficemenuReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficemenuReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficemenuReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
