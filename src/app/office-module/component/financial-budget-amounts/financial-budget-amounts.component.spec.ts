import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBudgetAmountsComponent } from './financial-budget-amounts.component';

describe('FinancialBudgetAmountsComponent', () => {
  let component: FinancialBudgetAmountsComponent;
  let fixture: ComponentFixture<FinancialBudgetAmountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialBudgetAmountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialBudgetAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
