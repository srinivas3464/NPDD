import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhotoComponent } from './view-photo.component';

describe('ViewPhotoComponent', () => {
  let component: ViewPhotoComponent;
  let fixture: ComponentFixture<ViewPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
