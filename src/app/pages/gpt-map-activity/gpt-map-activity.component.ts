import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_8_SPRUCE_BUILDING } from 'src/app/utils/buildings/resources';
import { MaterialModule } from 'src/material.module';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'gpt-map-activity',
  templateUrl: './gpt-map-activity.component.html',
  styleUrls: ['./gpt-map-activity.component.scss'],
  imports: [CommonModule, MaterialModule, CdkDrag],
  standalone: true,
})
export class GptMapActivity {
  NEUTRAL_DRAG_POSITION = { x: 0, y: 0 };

  dragDisplayPositions = {
    settingsView: this.NEUTRAL_DRAG_POSITION,
    buildingsView: this.NEUTRAL_DRAG_POSITION,
  };

  dragPosition = { x: 0, y: 0 };
  readonly PATH_BUILDINGS = [MOCK_8_SPRUCE_BUILDING];
  isListVisible = false;

  interestPoints = [
    { label: 'Park', id: 'park' },
    { label: 'Vendor', id: 'vendor' },
    { label: 'Office', id: 'office' },
    { label: 'Subway', id: 'subway' },
    { label: 'Entertainment', id: 'entertainment' },
    { label: 'Friends', id: 'friends' },
  ];

  constructor() {}
}
