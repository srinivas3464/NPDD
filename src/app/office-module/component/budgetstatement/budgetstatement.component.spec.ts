import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetstatementComponent } from './budgetstatement.component';

describe('BudgetstatementComponent', () => {
  let component: BudgetstatementComponent;
  let fixture: ComponentFixture<BudgetstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetstatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
