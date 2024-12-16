import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmRegistrationDetailsComponent } from './firm-registration-details.component';

describe('FirmRegistrationDetailsComponent', () => {
  let component: FirmRegistrationDetailsComponent;
  let fixture: ComponentFixture<FirmRegistrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmRegistrationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
