import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictQtyAdditionReportComponent } from './district-qty-addition-report.component';

describe('DistrictQtyAdditionReportComponent', () => {
  let component: DistrictQtyAdditionReportComponent;
  let fixture: ComponentFixture<DistrictQtyAdditionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictQtyAdditionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictQtyAdditionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
