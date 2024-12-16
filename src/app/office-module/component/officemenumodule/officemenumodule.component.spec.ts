import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficemenumoduleComponent } from './officemenumodule.component';

describe('OfficemenumoduleComponent', () => {
  let component: OfficemenumoduleComponent;
  let fixture: ComponentFixture<OfficemenumoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficemenumoduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficemenumoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
