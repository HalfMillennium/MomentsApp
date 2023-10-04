import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_8_SPRUCE_BUILDING } from 'src/app/utils/buildings/resources';
import { MaterialModule } from 'src/material.module';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { GoogleMapsModule } from '@angular/google-maps';
import { ChipToggleSet } from '../components/chip-toggle-set/chip-toggle-set.component';
import { ChipToggle } from '../components/chip-toggle-set/utils';

@Component({
  selector: 'gpt-map-activity',
  templateUrl: './gpt-map-activity.component.html',
  styleUrls: ['./gpt-map-activity.component.scss'],
  imports: [
    CommonModule,
    MaterialModule,
    CdkDrag,
    GoogleMapsModule,
    ChipToggleSet,
  ],
  standalone: true,
})
export class GptMapActivity {
  NEUTRAL_DRAG_POSITION = { x: 0, y: 0 };

  dragDisplayPositions = {
    buildingsView: this.NEUTRAL_DRAG_POSITION,
  };

  dragPosition = { x: 0, y: 0 };
  readonly PATH_BUILDINGS = [MOCK_8_SPRUCE_BUILDING];
  isListVisible = false;

  interestPoints = [
    { label: 'Park', id: 'park', icon: 'landscape' },
    { label: 'Vendor', id: 'vendor', icon: 'store' },
    { label: 'Office', id: 'office', icon: 'business' },
    { label: 'Cafes', id: 'cafes', icon: 'local_cafe' },
    { label: 'Subway', id: 'subway', icon: 'subway' },
    { label: 'Nightlife', id: 'nightlife', icon: 'local_bar' },
    { label: 'Entertainment', id: 'entertainment', icon: 'local_movies' },
    { label: 'Friends', id: 'friends', icon: 'people' },
  ];

  interestPointsChipSet: ChipToggle[] = this.interestPoints.map((point) => {
    return {
      label: point.label,
      icon: point.icon,
      available: true,
      checked: false,
    };
  });

  constructor() {}
}
