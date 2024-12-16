import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDistrictWiseDetailsComponent } from './po-district-wise-details.component';

describe('PoDistrictWiseDetailsComponent', () => {
  let component: PoDistrictWiseDetailsComponent;
  let fixture: ComponentFixture<PoDistrictWiseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoDistrictWiseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDistrictWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
