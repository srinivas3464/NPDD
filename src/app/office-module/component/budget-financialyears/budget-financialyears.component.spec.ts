import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFinancialyearsComponent } from './budget-financialyears.component';

describe('BudgetFinancialyearsComponent', () => {
  let component: BudgetFinancialyearsComponent;
  let fixture: ComponentFixture<BudgetFinancialyearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFinancialyearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetFinancialyearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
