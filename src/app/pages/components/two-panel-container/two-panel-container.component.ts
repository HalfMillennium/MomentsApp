import { Component, Input } from '@angular/core';
import { BuildingDetailChunk, Image } from 'src/app/utils/interfaces';
import { MaterialModule } from 'src/material.module';
import { CommonModule } from '@angular/common';

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

  @Input() direction: 'left-text' | 'right-text' = 'right-text';
}
