import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceApprovalsDetailsComponent } from './invoice-approvals-details.component';

describe('InvoiceApprovalsDetailsComponent', () => {
  let component: InvoiceApprovalsDetailsComponent;
  let fixture: ComponentFixture<InvoiceApprovalsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceApprovalsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceApprovalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
