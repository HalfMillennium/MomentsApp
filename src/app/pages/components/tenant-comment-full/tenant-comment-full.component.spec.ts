import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantCommentFullComponent } from './tenant-comment-full.component';

describe('TenantCommentFullComponent', () => {
  let component: TenantCommentFullComponent;
  let fixture: ComponentFixture<TenantCommentFullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantCommentFullComponent]
    });
    fixture = TestBed.createComponent(TenantCommentFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
