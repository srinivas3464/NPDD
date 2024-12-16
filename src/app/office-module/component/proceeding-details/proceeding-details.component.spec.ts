import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingDetailsComponent } from './proceeding-details.component';

describe('ProceedingDetailsComponent', () => {
  let component: ProceedingDetailsComponent;
  let fixture: ComponentFixture<ProceedingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
