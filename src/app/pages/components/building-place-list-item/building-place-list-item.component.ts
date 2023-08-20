import { Component, Input } from '@angular/core';
import { ApartmentBuilding } from 'src/app/utils/buildings/interfaces';

@Component({
  selector: 'building-place-list-item',
  templateUrl: './building-place-list-item.component.html',
  styleUrls: ['./building-place-list-item.component.scss'],
  standalone: true,
})
export class BuildingPlaceListItem {
  @Input() apartmentBuilding?: ApartmentBuilding;
}
