import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderWiseSummaryComponent } from './tender-wise-summary.component';

describe('TenderWiseSummaryComponent', () => {
  let component: TenderWiseSummaryComponent;
  let fixture: ComponentFixture<TenderWiseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderWiseSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
