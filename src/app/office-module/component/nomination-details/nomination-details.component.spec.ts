import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationDetailsComponent } from './nomination-details.component';

describe('NominationDetailsComponent', () => {
  let component: NominationDetailsComponent;
  let fixture: ComponentFixture<NominationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
