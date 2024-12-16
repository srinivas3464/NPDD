import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDistrictwisereportComponent } from './stock-districtwisereport.component';

describe('StockDistrictwisereportComponent', () => {
  let component: StockDistrictwisereportComponent;
  let fixture: ComponentFixture<StockDistrictwisereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDistrictwisereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDistrictwisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
