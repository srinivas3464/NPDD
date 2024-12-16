import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockentrydetailsComponent } from './stockentrydetails.component';

describe('StockentrydetailsComponent', () => {
  let component: StockentrydetailsComponent;
  let fixture: ComponentFixture<StockentrydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockentrydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockentrydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
