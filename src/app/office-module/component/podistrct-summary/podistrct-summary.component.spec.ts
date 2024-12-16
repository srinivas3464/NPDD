import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PODistrctSummaryComponent } from './podistrct-summary.component';

describe('PODistrctSummaryComponent', () => {
  let component: PODistrctSummaryComponent;
  let fixture: ComponentFixture<PODistrctSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PODistrctSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PODistrctSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
