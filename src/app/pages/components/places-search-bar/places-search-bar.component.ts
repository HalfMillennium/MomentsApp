import { Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathType, PathTypeRecord } from 'src/app/utils/paths/resources';
@Component({
  selector: 'places-search-bar',
  templateUrl: './places-search-bar.component.html',
  styleUrls: ['./places-search-bar.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PlacesSearchBar {
  readonly PathTypeRecord = PathTypeRecord;

  @Input() currentPathType: PathType = PathType.WORK_COMMUTE;
}
