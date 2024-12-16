import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSubmittedFarmerListComponent } from './volunteer-submitted-farmer-list.component';

describe('VolunteerSubmittedFarmerListComponent', () => {
  let component: VolunteerSubmittedFarmerListComponent;
  let fixture: ComponentFixture<VolunteerSubmittedFarmerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerSubmittedFarmerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSubmittedFarmerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
