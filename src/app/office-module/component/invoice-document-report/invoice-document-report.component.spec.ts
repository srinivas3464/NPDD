import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDocumentReportComponent } from './invoice-document-report.component';

describe('InvoiceDocumentReportComponent', () => {
  let component: InvoiceDocumentReportComponent;
  let fixture: ComponentFixture<InvoiceDocumentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDocumentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDocumentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
