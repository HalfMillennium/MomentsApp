import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPlaceListItem } from './building-place-list-item.component';

describe('BuildingPlaceListItem', () => {
  let component: BuildingPlaceListItem;
  let fixture: ComponentFixture<BuildingPlaceListItem>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingPlaceListItem],
    });
    fixture = TestBed.createComponent(BuildingPlaceListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
