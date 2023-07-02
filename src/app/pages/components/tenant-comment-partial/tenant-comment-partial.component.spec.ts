import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantCommentPartialComponent } from './tenant-comment-partial.component';

describe('TenantCommentPartialComponent', () => {
  let component: TenantCommentPartialComponent;
  let fixture: ComponentFixture<TenantCommentPartialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantCommentPartialComponent]
    });
    fixture = TestBed.createComponent(TenantCommentPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
