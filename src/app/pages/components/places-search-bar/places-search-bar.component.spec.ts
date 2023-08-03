import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSearchBar } from './places-search-bar.component';

describe('PlacesSearchBarComponent', () => {
  let component: PlacesSearchBar;
  let fixture: ComponentFixture<PlacesSearchBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacesSearchBar],
    });
    fixture = TestBed.createComponent(PlacesSearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
