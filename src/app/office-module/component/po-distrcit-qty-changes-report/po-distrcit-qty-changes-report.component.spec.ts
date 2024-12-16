import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDistrcitQtyChangesReportComponent } from './po-distrcit-qty-changes-report.component';

describe('PoDistrcitQtyChangesReportComponent', () => {
  let component: PoDistrcitQtyChangesReportComponent;
  let fixture: ComponentFixture<PoDistrcitQtyChangesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoDistrcitQtyChangesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDistrcitQtyChangesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
