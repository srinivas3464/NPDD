import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDetailsEntryComponent } from './tender-details-entry.component';

describe('TenderDetailsEntryComponent', () => {
  let component: TenderDetailsEntryComponent;
  let fixture: ComponentFixture<TenderDetailsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderDetailsEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDetailsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
