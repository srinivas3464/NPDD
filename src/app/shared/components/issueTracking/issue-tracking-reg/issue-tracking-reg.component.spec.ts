import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTrackingRegComponent } from './issue-tracking-reg.component';

describe('IssueTrackingRegComponent', () => {
  let component: IssueTrackingRegComponent;
  let fixture: ComponentFixture<IssueTrackingRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueTrackingRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTrackingRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
