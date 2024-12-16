import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDataPushStatusComponent } from './farmer-data-push-status.component';

describe('FarmerDataPushStatusComponent', () => {
  let component: FarmerDataPushStatusComponent;
  let fixture: ComponentFixture<FarmerDataPushStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDataPushStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDataPushStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
