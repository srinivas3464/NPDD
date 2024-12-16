import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDistrictQtyAdditionComponent } from './po-district-qty-addition.component';

describe('PoDistrictQtyAdditionComponent', () => {
  let component: PoDistrictQtyAdditionComponent;
  let fixture: ComponentFixture<PoDistrictQtyAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoDistrictQtyAdditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDistrictQtyAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
