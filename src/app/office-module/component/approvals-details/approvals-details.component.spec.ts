import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsDetailsComponent } from './approvals-details.component';

describe('ApprovalsDetailsComponent', () => {
  let component: ApprovalsDetailsComponent;
  let fixture: ComponentFixture<ApprovalsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
