import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingDetail } from './building-detail.component';

describe('SpaceDetailComponent', () => {
  let component: BuildingDetail;
  let fixture: ComponentFixture<BuildingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
