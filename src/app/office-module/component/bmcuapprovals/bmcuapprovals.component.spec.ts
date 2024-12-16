import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BMCUApprovalsComponent } from './bmcuapprovals.component';

describe('BMCUApprovalsComponent', () => {
  let component: BMCUApprovalsComponent;
  let fixture: ComponentFixture<BMCUApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BMCUApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BMCUApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
