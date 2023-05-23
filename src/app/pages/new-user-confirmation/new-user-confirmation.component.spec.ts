import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserConfirmation } from './new-user-confirmation.component';

describe('NewUserConfirmation', () => {
  let component: NewUserConfirmation;
  let fixture: ComponentFixture<NewUserConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserConfirmation ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
