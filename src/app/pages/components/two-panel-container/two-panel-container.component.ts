import { Component, Input } from '@angular/core';
import { BuildingDetailChunk } from 'src/app/utils/interfaces';
import { MaterialModule } from 'src/material.module';
import { CommonModule } from '@angular/common';
import { BUILDING_AMENITY_ICONS } from 'src/app/utils/buildings/resources';

/**
 * Two panel container, with the text panel containing a header title
 */
@Component({
  selector: 'two-panel-title-container',
  templateUrl: './two-panel-container.component.html',
  styleUrls: ['./two-panel-container.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule],
})
export class TwoPanelContainerComponent {
  @Input({ required: true })
  buildingDetailChunk!: BuildingDetailChunk;

  readonly BUILDING_AMENITY_ICONS = BUILDING_AMENITY_ICONS;

  // Whether or not chunk includes list of amenities instead of text
  @Input() amenityList = false;
}
