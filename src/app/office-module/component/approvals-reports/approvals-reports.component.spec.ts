import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsReportsComponent } from './approvals-reports.component';

describe('ApprovalsReportsComponent', () => {
  let component: ApprovalsReportsComponent;
  let fixture: ComponentFixture<ApprovalsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
