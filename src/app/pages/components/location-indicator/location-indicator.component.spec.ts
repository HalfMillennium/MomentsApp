import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationIndicatorComponent } from './location-indicator.component';

describe('LocationIndicatorComponent', () => {
  let component: LocationIndicatorComponent;
  let fixture: ComponentFixture<LocationIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationIndicatorComponent]
    });
    fixture = TestBed.createComponent(LocationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
