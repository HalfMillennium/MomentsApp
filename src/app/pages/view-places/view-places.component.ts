import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Path } from '../../utils/paths/interfaces';
import { PathType } from '../../utils/paths/resources';
import { MaterialModule } from 'src/material.module';
import { TEST_SAVED_PATHS } from '../../utils/paths/resources';
import { PlacesSearchBar } from '../components/places-search-bar/places-search-bar.component';

@Component({
  selector: 'view-places',
  templateUrl: './view-places.component.html',
  styleUrls: ['./view-places.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, PlacesSearchBar],
})
export class ViewPlacesComponent {
  @Input() selectedSavedPath?: Path;
  @Input() allSavedPaths?: Path[] = TEST_SAVED_PATHS;

  selectedPathType: PathType = PathType.WORK_COMMUTE;
}
