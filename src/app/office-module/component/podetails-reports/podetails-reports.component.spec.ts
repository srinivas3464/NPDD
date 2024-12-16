import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodetailsReportsComponent } from './podetails-reports.component';

describe('PodetailsReportsComponent', () => {
  let component: PodetailsReportsComponent;
  let fixture: ComponentFixture<PodetailsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodetailsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodetailsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
