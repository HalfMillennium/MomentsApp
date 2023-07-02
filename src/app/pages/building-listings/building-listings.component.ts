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
  MOCK_15_CLIFF_BUILDING,
  MOCK_8_SPRUCE_TENANT_COMMENTS,
  MOCK_15_CLIFF_TENANT_COMMENTS,
  MOCK_8_SPRUCE_DETAIL_CHUNKS,
  BUILDING_TYPE,
  BuildingTypeEnum,
  MOCK_15_CLIFF_LISTINGS_RECORD,
  MOCK_15_CLIFF_DETAIL_CHUNKS,
} from '../../utils/buildings/resources';
import { ApartmentListing } from '../../utils/buildings/interfaces';
import { ListingCardComponent } from '../components/listing-card/listing-card.component';
import { Observable, of as observableOf } from 'rxjs';
import { ApartmentBuilding } from '../../utils/buildings/interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BuildingDetail } from '../building-detail/building-detail.component';
import { TenantCommentPartial } from '../components/tenant-comment-partial/tenant-comment-partial.component';
import { TenantComment } from '../../utils/buildings/interfaces';

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
    TenantCommentPartial,
  ],
})
export class BuildingListingsComponent implements OnChanges {
  @Input() readonly selectedListingSet = MOCK_8_SPRUCE_LISTINGS_RECORD;
  @Input() readonly currentBuilding?: ApartmentBuilding;
  @Input() readonly tenantComments?: TenantComment[];

  // TODO: Create type for building info set
  MOCK_BUILDING_DATA: Record<string, any> = {
    '32': {
      listings: MOCK_8_SPRUCE_LISTINGS_RECORD,
      building: MOCK_8_SPRUCE_BUILDING,
      tenantComments: MOCK_8_SPRUCE_TENANT_COMMENTS,
      detailChunks: MOCK_8_SPRUCE_DETAIL_CHUNKS,
    },
    '33': {
      listings: MOCK_15_CLIFF_LISTINGS_RECORD,
      building: MOCK_15_CLIFF_BUILDING,
      tenantComments: MOCK_15_CLIFF_TENANT_COMMENTS,
      detailChunks: MOCK_15_CLIFF_DETAIL_CHUNKS,
    },
  };

  currentBuildingId: string | undefined;

  readonly BUILDING_TYPE = BUILDING_TYPE;
  readonly BuildingTypeEnum = BuildingTypeEnum;

  @Input() currentListingId: string = '1';

  @ViewChild('carousel') carousel!: MdbCarouselComponent;

  constructor(private activatedRoute: ActivatedRoute) {
    const params = this.activatedRoute.snapshot.paramMap;
    this.currentBuilding =
      this.MOCK_BUILDING_DATA[params.get('id') ?? ''].building;
  }

  currentListing: ApartmentListing =
    this.selectedListingSet[this.currentListingId];

  slideIntervalMs = 0;

  tenantCommentsObs: Observable<TenantComment[]> = observableOf(
    MOCK_8_SPRUCE_TENANT_COMMENTS
  );

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
