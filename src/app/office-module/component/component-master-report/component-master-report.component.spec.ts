import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMasterReportComponent } from './component-master-report.component';

describe('ComponentMasterReportComponent', () => {
  let component: ComponentMasterReportComponent;
  let fixture: ComponentFixture<ComponentMasterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentMasterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMasterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
