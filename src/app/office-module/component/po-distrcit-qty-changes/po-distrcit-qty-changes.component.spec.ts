import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDistrcitQtyChangesComponent } from './po-distrcit-qty-changes.component';

describe('PoDistrcitQtyChangesComponent', () => {
  let component: PoDistrcitQtyChangesComponent;
  let fixture: ComponentFixture<PoDistrcitQtyChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoDistrcitQtyChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDistrcitQtyChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
