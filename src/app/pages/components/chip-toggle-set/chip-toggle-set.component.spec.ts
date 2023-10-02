import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipToggleSet } from './chip-toggle-set.component';

describe('ChipToggleSetComponent', () => {
  let component: ChipToggleSet;
  let fixture: ComponentFixture<ChipToggleSet>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipToggleSet],
    });
    fixture = TestBed.createComponent(ChipToggleSet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
