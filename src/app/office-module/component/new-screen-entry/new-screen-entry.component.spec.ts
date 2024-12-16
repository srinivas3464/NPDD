import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScreenEntryComponent } from './new-screen-entry.component';

describe('NewScreenEntryComponent', () => {
  let component: NewScreenEntryComponent;
  let fixture: ComponentFixture<NewScreenEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewScreenEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScreenEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
