import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PODateWiseSummaryComponent } from './podate-wise-summary.component';

describe('PODateWiseSummaryComponent', () => {
  let component: PODateWiseSummaryComponent;
  let fixture: ComponentFixture<PODateWiseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PODateWiseSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PODateWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
