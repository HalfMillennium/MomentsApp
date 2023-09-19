import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptMapActivity } from './gpt-map-activity.component';

describe('GptMapActivity', () => {
  let component: GptMapActivity;
  let fixture: ComponentFixture<GptMapActivity>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GptMapActivity],
    });
    fixture = TestBed.createComponent(GptMapActivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
