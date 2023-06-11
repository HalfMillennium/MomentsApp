import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CarouselModule } from '@coreui/angular';
import { MaterialModule } from 'src/material.module';
import {
  ApartmentListing,
  MOCK_8_SPRUCE_LISTINGS,
} from '../../utils/buildings/resources';
import { ApartmentBuilding } from 'src/app/utils/interfaces';
@Component({
  selector: 'app-building-listings',
  templateUrl: './building-listings.component.html',
  styleUrls: ['./building-listings.component.scss'],
  standalone: true,
  imports: [CommonModule, ScrollingModule, CarouselModule, MaterialModule],
})
export class BuildingListingsComponent {
  readonly MOCK_LISTING_SET = [MOCK_8_SPRUCE_LISTINGS];

  @Input() readonly selectedListingSet: ApartmentListing[] =
    MOCK_8_SPRUCE_LISTINGS;

  currentListing: ApartmentListing | undefined;

  slideIntervalMs = 5000;
}
