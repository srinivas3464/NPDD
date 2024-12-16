import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActinvoicedetailsComponent } from './actinvoicedetails.component';

describe('ActinvoicedetailsComponent', () => {
  let component: ActinvoicedetailsComponent;
  let fixture: ComponentFixture<ActinvoicedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActinvoicedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActinvoicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
