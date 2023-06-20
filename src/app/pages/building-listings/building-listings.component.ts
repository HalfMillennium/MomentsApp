import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  MdbCarouselComponent,
  MdbCarouselModule,
} from 'mdb-angular-ui-kit/carousel';
import { MaterialModule } from 'src/material.module';
import {
  MOCK_8_SPRUCE_LISTINGS_RECORD,
  MOCK_8_SPRUCE_BUILDING,
  BUILDING_TYPE,
  BuildingTypeEnum,
} from '../../utils/buildings/resources';
import { ApartmentListing } from '../../utils/buildings/interfaces';
import { ListingCardComponent } from '../components/listing-card/listing-card.component';
import { Observable } from 'rxjs';
import { ApartmentBuilding } from '../../utils/buildings/interfaces';
import { RouterModule } from '@angular/router';
import { BuildingDetail } from '../building-detail/building-detail.component';

@Component({
  selector: 'app-building-listings',
  templateUrl: './building-listings.component.html',
  styleUrls: ['./building-listings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MaterialModule,
    ListingCardComponent,
    RouterModule,
    MdbCarouselModule,
    BuildingDetail,
  ],
})
export class BuildingListingsComponent implements OnChanges {
  @Input() readonly selectedListingSet = MOCK_8_SPRUCE_LISTINGS_RECORD;
  @Input() readonly currentBuilding: ApartmentBuilding = MOCK_8_SPRUCE_BUILDING;

  readonly BUILDING_TYPE = BUILDING_TYPE;
  readonly BuildingTypeEnum = BuildingTypeEnum;

  @Input() currentListingId: string = '1';

  @ViewChild('carousel') carousel!: MdbCarouselComponent;

  currentListing: ApartmentListing =
    this.selectedListingSet[this.currentListingId];

  slideIntervalMs = 0;

  closedListings: Observable<ApartmentListing[]> | undefined;

  showListing(id: string) {
    this.currentListing = this.selectedListingSet[id];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentListing']) {
      console.log('currentListing changed');
    }
  }
}
