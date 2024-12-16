import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPDFComponent } from './view-pdf.component';

describe('ViewPDFComponent', () => {
  let component: ViewPDFComponent;
  let fixture: ComponentFixture<ViewPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
