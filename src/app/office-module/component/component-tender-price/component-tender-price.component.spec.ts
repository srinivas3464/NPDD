import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTenderPriceComponent } from './component-tender-price.component';

describe('ComponentTenderPriceComponent', () => {
  let component: ComponentTenderPriceComponent;
  let fixture: ComponentFixture<ComponentTenderPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentTenderPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTenderPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
