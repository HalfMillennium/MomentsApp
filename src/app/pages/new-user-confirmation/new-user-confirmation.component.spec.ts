import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserConfirmationComponent } from './new-user-confirmation.component';

describe('NewUserConfirmationComponent', () => {
  let component: NewUserConfirmationComponent;
  let fixture: ComponentFixture<NewUserConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
