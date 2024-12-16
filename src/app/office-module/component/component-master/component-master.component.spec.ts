import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMasterComponent } from './component-master.component';

describe('ComponentMasterComponent', () => {
  let component: ComponentMasterComponent;
  let fixture: ComponentFixture<ComponentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
