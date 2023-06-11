import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApartmentListing } from 'src/app/utils/buildings/interfaces';
import { MaterialModule } from 'src/material.module';
@Component({
  selector: 'listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
  standalone: true,
  imports: [MaterialModule],
})
export class ListingCardComponent {
  @Input({ required: true }) listing!: ApartmentListing;

  @Output() listingSelectEvent = new EventEmitter<{
    id: string;
  }>();

  selectListing() {
    this.listingSelectEvent.emit({ id: this.listing.id });
  }
}
