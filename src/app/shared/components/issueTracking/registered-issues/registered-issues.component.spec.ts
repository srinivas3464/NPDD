import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredIssuesComponent } from './registered-issues.component';

describe('RegisteredIssuesComponent', () => {
  let component: RegisteredIssuesComponent;
  let fixture: ComponentFixture<RegisteredIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
