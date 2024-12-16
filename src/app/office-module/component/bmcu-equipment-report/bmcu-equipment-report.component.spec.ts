import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcuEquipmentReportComponent } from './bmcu-equipment-report.component';

describe('BmcuEquipmentReportComponent', () => {
  let component: BmcuEquipmentReportComponent;
  let fixture: ComponentFixture<BmcuEquipmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcuEquipmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcuEquipmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
