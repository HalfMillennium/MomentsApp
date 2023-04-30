import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview } from './overview.component';

describe('OverviewComponent', () => {
  let component: Overview;
  let fixture: ComponentFixture<Overview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Overview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
