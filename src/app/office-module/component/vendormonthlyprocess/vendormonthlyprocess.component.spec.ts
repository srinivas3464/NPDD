import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendormonthlyprocessComponent } from './vendormonthlyprocess.component';

describe('VendormonthlyprocessComponent', () => {
  let component: VendormonthlyprocessComponent;
  let fixture: ComponentFixture<VendormonthlyprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendormonthlyprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendormonthlyprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
