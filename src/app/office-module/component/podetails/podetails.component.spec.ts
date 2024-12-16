import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodetailsComponent } from './podetails.component';

describe('PodetailsComponent', () => {
  let component: PodetailsComponent;
  let fixture: ComponentFixture<PodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
