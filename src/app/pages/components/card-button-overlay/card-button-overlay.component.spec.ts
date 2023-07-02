import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonOverlayComponent } from './card-button-overlay.component';

describe('CardButtonOverlayComponent', () => {
  let component: CardButtonOverlayComponent;
  let fixture: ComponentFixture<CardButtonOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardButtonOverlayComponent]
    });
    fixture = TestBed.createComponent(CardButtonOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
