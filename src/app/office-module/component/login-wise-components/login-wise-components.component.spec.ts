import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWiseComponentsComponent } from './login-wise-components.component';

describe('LoginWiseComponentsComponent', () => {
  let component: LoginWiseComponentsComponent;
  let fixture: ComponentFixture<LoginWiseComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWiseComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWiseComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
