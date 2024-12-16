import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDetailsReportsComponent } from './firm-details-reports.component';

describe('FirmDetailsReportsComponent', () => {
  let component: FirmDetailsReportsComponent;
  let fixture: ComponentFixture<FirmDetailsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmDetailsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmDetailsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
