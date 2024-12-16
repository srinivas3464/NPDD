import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodistrictpercentagesummaryComponent } from './podistrictpercentagesummary.component';

describe('PodistrictpercentagesummaryComponent', () => {
  let component: PodistrictpercentagesummaryComponent;
  let fixture: ComponentFixture<PodistrictpercentagesummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodistrictpercentagesummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodistrictpercentagesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
