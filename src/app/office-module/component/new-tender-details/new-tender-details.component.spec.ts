import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTenderDetailsComponent } from './new-tender-details.component';

describe('NewTenderDetailsComponent', () => {
  let component: NewTenderDetailsComponent;
  let fixture: ComponentFixture<NewTenderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTenderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTenderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
