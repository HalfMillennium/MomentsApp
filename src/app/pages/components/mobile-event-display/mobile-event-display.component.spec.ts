import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationActivityDisplayComponent } from './mobile-event-display';

describe('LocationActivityDisplayComponent', () => {
  let component: LocationActivityDisplayComponent;
  let fixture: ComponentFixture<LocationActivityDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationActivityDisplayComponent],
    });
    fixture = TestBed.createComponent(LocationActivityDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
