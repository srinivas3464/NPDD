import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmSecurityDepositeComponent } from './firm-security-deposite.component';

describe('FirmSecurityDepositeComponent', () => {
  let component: FirmSecurityDepositeComponent;
  let fixture: ComponentFixture<FirmSecurityDepositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmSecurityDepositeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmSecurityDepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
