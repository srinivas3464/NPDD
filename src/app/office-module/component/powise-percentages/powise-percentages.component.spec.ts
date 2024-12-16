import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POWisePercentagesComponent } from './powise-percentages.component';

describe('POWisePercentagesComponent', () => {
  let component: POWisePercentagesComponent;
  let fixture: ComponentFixture<POWisePercentagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ POWisePercentagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(POWisePercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
