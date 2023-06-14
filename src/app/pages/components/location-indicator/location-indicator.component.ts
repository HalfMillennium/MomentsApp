import { Component, Input } from '@angular/core';
import { ApartmentBuilding } from 'src/app/utils/buildings/interfaces';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'building-location-indicator',
  templateUrl: './location-indicator.component.html',
  styleUrls: ['./location-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class LocationIndicatorComponent {
  @Input({ required: true }) currentBuilding!: ApartmentBuilding;
}
