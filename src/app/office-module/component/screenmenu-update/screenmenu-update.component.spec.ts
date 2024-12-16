import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenmenuUpdateComponent } from './screenmenu-update.component';

describe('ScreenmenuUpdateComponent', () => {
  let component: ScreenmenuUpdateComponent;
  let fixture: ComponentFixture<ScreenmenuUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenmenuUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenmenuUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
