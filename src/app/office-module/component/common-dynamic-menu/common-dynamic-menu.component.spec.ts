import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDynamicMenuComponent } from './common-dynamic-menu.component';

describe('CommonDynamicMenuComponent', () => {
  let component: CommonDynamicMenuComponent;
  let fixture: ComponentFixture<CommonDynamicMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDynamicMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDynamicMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
