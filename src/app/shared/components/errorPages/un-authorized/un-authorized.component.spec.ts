import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorizedComponent } from './un-authorized.component';

describe('UnAuthorizedComponent', () => {
  let component: UnAuthorizedComponent;
  let fixture: ComponentFixture<UnAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnAuthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
