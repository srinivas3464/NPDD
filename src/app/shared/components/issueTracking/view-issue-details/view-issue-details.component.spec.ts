import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssueDetailsComponent } from './view-issue-details.component';

describe('ViewIssueDetailsComponent', () => {
  let component: ViewIssueDetailsComponent;
  let fixture: ComponentFixture<ViewIssueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIssueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
