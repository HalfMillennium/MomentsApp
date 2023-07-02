import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPanelContainerComponent } from './two-panel-container.component';

describe('TwoPanelContainerComponent', () => {
  let component: TwoPanelContainerComponent;
  let fixture: ComponentFixture<TwoPanelContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwoPanelContainerComponent]
    });
    fixture = TestBed.createComponent(TwoPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
