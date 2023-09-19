import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Path } from '../../utils/paths/interfaces';
import { PathType } from '../../utils/paths/resources';
import { MaterialModule } from 'src/material.module';
import { TEST_SAVED_PATHS } from '../../utils/paths/resources';

import { PlacesSearchBar } from '../components/places-search-bar/places-search-bar.component';
import { BuildingPlaceListItem } from '../components/building-place-list-item/building-place-list-item.component';
import { Observable, of as observableOf } from 'rxjs';
import { ApartmentBuilding } from 'src/app/utils/buildings/interfaces';
import {
  MOCK_8_SPRUCE_BUILDING,
  MOCK_15_CLIFF_BUILDING,
} from 'src/app/utils/buildings/resources';
import { GptMapActivity } from '../gpt-map-activity/gpt-map-activity.component';

@Component({
  selector: 'view-places',
  templateUrl: './view-places.component.html',
  styleUrls: ['./view-places.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    PlacesSearchBar,
    BuildingPlaceListItem,
    GptMapActivity,
  ],
})
export class ViewPlacesComponent {
  @Input() selectedSavedPath?: Path;
  @Input() allSavedPaths?: Path[] = TEST_SAVED_PATHS;

  selectedPathType: PathType = PathType.WORK_COMMUTE;
  currentBuildingSetObs: Observable<ApartmentBuilding[]> = observableOf([
    MOCK_8_SPRUCE_BUILDING,
    MOCK_15_CLIFF_BUILDING,
  ]);
}
